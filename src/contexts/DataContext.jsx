import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const { currentUser, userProfile } = useAuth();
  const [properties, setProperties] = useState([]);
  const [clients, setClients] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties
  useEffect(() => {
    if (!currentUser) {
      setProperties([]);
      setLoading(false);
      return;
    }

    const propertiesRef = collection(db, 'properties');
    let q;

    if (userProfile?.role === 'admin') {
      q = query(propertiesRef);
    } else {
      q = query(propertiesRef, where('assignedClients', 'array-contains', currentUser.uid));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const propertiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProperties(propertiesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser, userProfile]);

  // Fetch clients (admin only)
  useEffect(() => {
    if (!currentUser || userProfile?.role !== 'admin') {
      setClients([]);
      return;
    }

    const clientsRef = collection(db, 'users');
    const q = query(clientsRef, where('role', '==', 'client'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const clientsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setClients(clientsData);
    });

    return () => unsubscribe();
  }, [currentUser, userProfile]);

  // Fetch documents
  useEffect(() => {
    if (!currentUser) {
      setDocuments([]);
      return;
    }

    const documentsRef = collection(db, 'documents');
    let q;

    if (userProfile?.role === 'admin') {
      q = query(documentsRef);
    } else {
      q = query(documentsRef, where('clientId', '==', currentUser.uid));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const documentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDocuments(documentsData);
    });

    return () => unsubscribe();
  }, [currentUser, userProfile]);

  // Add property
  async function addProperty(propertyData) {
    const propertiesRef = collection(db, 'properties');
    return await addDoc(propertiesRef, {
      ...propertyData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }

  // Update property
  async function updateProperty(propertyId, propertyData) {
    const propertyRef = doc(db, 'properties', propertyId);
    return await updateDoc(propertyRef, {
      ...propertyData,
      updatedAt: serverTimestamp()
    });
  }

  // Delete property
  async function deleteProperty(propertyId) {
    const propertyRef = doc(db, 'properties', propertyId);
    return await deleteDoc(propertyRef);
  }

  // Add document
  async function addDocument(documentData) {
    const documentsRef = collection(db, 'documents');
    return await addDoc(documentsRef, {
      ...documentData,
      createdAt: serverTimestamp()
    });
  }

  // Delete document
  async function deleteDocument(documentId) {
    const documentRef = doc(db, 'documents', documentId);
    return await deleteDoc(documentRef);
  }

  const value = {
    properties,
    clients,
    documents,
    loading,
    addProperty,
    updateProperty,
    deleteProperty,
    addDocument,
    deleteDocument
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
