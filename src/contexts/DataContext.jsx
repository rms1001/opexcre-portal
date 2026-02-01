import React, { createContext, useContext, useState, useCallback } from 'react';
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export function useData() {
    return useContext(DataContext);
}

export function DataProvider({ children }) {
    const { userProfile, isAdmin } = useAuth();
    const [properties, setProperties] = useState([]);
    const [clients, setClients] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);

  const fetchProperties = useCallback(async () => {
        setLoading(true);
        try {
                let q;
                if (isAdmin) {
                          q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
                } else {
                          const assignedProps = userProfile?.assignedProperties || [];
                          if (assignedProps.length === 0) {
                                      setProperties([]);
                                      return [];
                          }
                          q = query(collection(db, 'properties'), where('__name__', 'in', assignedProps));
                }
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProperties(data);
                return data;
        } catch (error) {
                console.error('Error fetching properties:', error);
                return [];
        } finally {
                setLoading(false);
        }
  }, [isAdmin, userProfile]);

  const addProperty = async (propertyData) => {
        const docRef = await addDoc(collection(db, 'properties'), {
                ...propertyData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
        });
        return docRef.id;
  };

  const updateProperty = async (id, propertyData) => {
        await updateDoc(doc(db, 'properties', id), {
                ...propertyData,
                updatedAt: serverTimestamp()
        });
  };

  const deleteProperty = async (id) => {
        await deleteDoc(doc(db, 'properties', id));
  };

  const getProperty = async (id) => {
        const docSnap = await getDoc(doc(db, 'properties', id));
        if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
  };

  const fetchClients = async () => {
        if (!isAdmin) return [];
        const q = query(collection(db, 'users'), where('role', '==', 'client'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setClients(data);
        return data;
  };

  const updateClient = async (id, data) => {
        await updateDoc(doc(db, 'users', id), {
                ...data,
                updatedAt: serverTimestamp()
        });
  };

  const uploadDocument = async (file, metadata) => {
        const storageRef = ref(storage, `documents/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        const docRef = await addDoc(collection(db, 'documents'), {
                ...metadata,
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                downloadURL,
                storagePath: storageRef.fullPath,
                createdAt: serverTimestamp()
        });
        return docRef.id;
  };

  const fetchDocuments = async (propertyId = null) => {
        let q;
        if (propertyId) {
                q = query(collection(db, 'documents'), where('propertyId', '==', propertyId), orderBy('createdAt', 'desc'));
        } else if (isAdmin) {
                q = query(collection(db, 'documents'), orderBy('createdAt', 'desc'));
        } else {
                const assignedProps = userProfile?.assignedProperties || [];
                if (assignedProps.length === 0) {
                          setDocuments([]);
                          return [];
                }
                q = query(collection(db, 'documents'), where('propertyId', 'in', assignedProps), orderBy('createdAt', 'desc'));
        }
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDocuments(data);
        return data;
  };

  const deleteDocument = async (id, storagePath) => {
        if (storagePath) {
                const storageRef = ref(storage, storagePath);
                await deleteObject(storageRef).catch(() => {});
        }
        await deleteDoc(doc(db, 'documents', id));
  };

  const value = {
        properties,
        clients,
        documents,
        loading,
        fetchProperties,
        addProperty,
        updateProperty,
        deleteProperty,
        getProperty,
        fetchClients,
        updateClient,
        uploadDocument,
        fetchDocuments,
        deleteDocument
  };

  return (
        <DataContext.Provider value={value}>
          {children}
        </DataContext.Provider>DataContext.Provider>
      );
}
