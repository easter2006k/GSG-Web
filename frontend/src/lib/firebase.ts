import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqHSz2PMS3ICk3wVl_sQvK6M9b-duF3YQ",
  authDomain: "gsg-trust.firebaseapp.com",
  projectId: "gsg-trust",
  storageBucket: "gsg-trust.firebasestorage.app",
  messagingSenderId: "1028372466783",
  appId: "1:1028372466783:web:1976aa593d21d324ca1fea",
  measurementId: "G-PB9RJCX76J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Analytics conditionally
export let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

// Firestore helper functions for Student Portal Submissions
export async function saveStudentSubmission(studentData: any) {
  try {
    const docRef = await addDoc(collection(db, "studentSubmissions"), {
      ...studentData,
      createdAt: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error writing document to Firestore (falling back to localStorage):", error);
    const existing = JSON.parse(localStorage.getItem('gsg_student_submissions') || '[]');
    const fallbackRecord = { ...studentData, id: 'STU-FB-' + Math.floor(100000 + Math.random() * 900000) };
    existing.unshift(fallbackRecord);
    localStorage.setItem('gsg_student_submissions', JSON.stringify(existing));
    return { success: true, id: fallbackRecord.id, fallback: true };
  }
}

export async function getStudentSubmissions() {
  try {
    const q = query(collection(db, "studentSubmissions"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const submissions: any[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      submissions.push({
        id: doc.id,
        ...data,
        registeredAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.registeredAt || new Date().toISOString())
      });
    });
    return submissions;
  } catch (error) {
    console.error("Error reading from Firestore (falling back to localStorage):", error);
    return JSON.parse(localStorage.getItem('gsg_student_submissions') || '[]');
  }
}

// Scholarship Applications Firestore functions
export async function saveScholarshipApplication(appData: any) {
  try {
    const docRef = await addDoc(collection(db, "scholarshipApplications"), {
      ...appData,
      createdAt: new Date()
    });
    const existing = JSON.parse(localStorage.getItem('gsg_scholarship_applications') || '[]');
    existing.unshift({ ...appData, firestoreId: docRef.id });
    localStorage.setItem('gsg_scholarship_applications', JSON.stringify(existing));
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error writing scholarship application to Firestore (falling back to localStorage):", error);
    const existing = JSON.parse(localStorage.getItem('gsg_scholarship_applications') || '[]');
    existing.unshift(appData);
    localStorage.setItem('gsg_scholarship_applications', JSON.stringify(existing));
    return { success: true, fallback: true };
  }
}

export async function getScholarshipApplication(queryStr: string) {
  try {
    const existing = JSON.parse(localStorage.getItem('gsg_scholarship_applications') || '[]');
    const found = existing.find(
      (item: any) =>
        item.appId?.toLowerCase() === queryStr.toLowerCase() ||
        item.mobile?.includes(queryStr) ||
        item.studentName?.toLowerCase().includes(queryStr.toLowerCase())
    );
    if (found) return found;

    const q = query(collection(db, "scholarshipApplications"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    let matched: any = null;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (
        data.appId?.toLowerCase() === queryStr.toLowerCase() ||
        data.mobile?.includes(queryStr)
      ) {
        matched = {
          id: doc.id,
          ...data,
          submissionDate: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : new Date().toLocaleDateString()
        };
      }
    });
    return matched;
  } catch (error) {
    console.error("Error tracking scholarship application:", error);
    return null;
  }
}
