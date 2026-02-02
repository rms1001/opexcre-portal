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
  serverTimestamp,
  getDocs
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

    // Wait for userProfile to be loaded before querying
    if (userProfile === undefined) {
      return;
    }

    const propertiesRef = collection(db, 'properties');
    let q;

    if (userProfile?.role === 'admin') {
      q = query(propertiesRef);
    } else {
      q = query(propertiesRef, where('assignedClients', 'array-contains', currentUser.uid));
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const propertiesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProperties(propertiesData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching properties:', error);
        setProperties([]);
        setLoading(false);
      }
    );

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

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const clientsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setClients(clientsData);
      },
      (error) => {
        console.error('Error fetching clients:', error);
        setClients([]);
      }
    );

    return () => unsubscribe();
  }, [currentUser, userProfile]);

  // Fetch documents
  useEffect(() => {
    if (!currentUser) {
      setDocuments([]);
      return;
    }

    // Wait for userProfile to be loaded
    if (userProfile === undefined) {
      return;
    }

    const documentsRef = collection(db, 'documents');
    let q;

    if (userProfile?.role === 'admin') {
      q = query(documentsRef);
    } else {
      const propertyIds = properties.map(p => p.id);
      if (propertyIds.length === 0) {
        setDocuments([]);
        return;
      }
      q = query(documentsRef, where('propertyId', 'in', propertyIds));
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const documentsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDocuments(documentsData);
      },
      (error) => {
        console.error('Error fetching documents:', error);
        setDocuments([]);
      }
    );

    return () => unsubscribe();
  }, [currentUser, userProfile, properties]);

  // Fetch properties function (for components that call it explicitly)
  const fetchProperties = async () => {
    return Promise.resolve();
  };

  // Fetch documents function (for components that call it explicitly)
  const fetchDocuments = async () => {
    return Promise.resolve();
  };

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
    fetchProperties,
    fetchDocuments,
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
