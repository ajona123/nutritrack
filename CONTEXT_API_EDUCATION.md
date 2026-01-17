📚 CONTEXT API - KONSEP & CARA KERJA
====================================

Apa itu Context API?
-------------------
Context API adalah fitur React untuk **share data antar komponen** tanpa perlu:
- Prop drilling (pass props ke banyak level)
- External state management library (Redux, Zustand, dll)

Ibaratnya:
- Tanpa Context: Harus pass data dari tangan ke tangan (prop drilling)
- Dengan Context: Ada "kotak data" global yang bisa diakses siapa saja


Permasalahan yang Kami Selesaikan
---------------------------------

SEBELUM (tanpa Context):
  
  SekolahPage (local state):
  └─ schools = [...]
     
  WebGISPage (local state):
  └─ sekolahData = [...]
  
  ❌ Data terpisah
  ❌ Tidak bisa otomatis sync
  ❌ User harus refresh untuk lihat perubahan


SESUDAH (dengan Context):

  ┌─────────────────────────┐
  │   SchoolContext         │
  │   (Global State)        │
  │   schools = [...]       │
  │   addSchool()           │
  │   updateSchool()        │
  │   deleteSchool()        │
  └─────────────────────────┘
           ↑             ↓
      Update by      Listen by
      SekolahPage    WebGISPage
  
  ✅ Data terpusat
  ✅ Otomatis sync
  ✅ User experience smooth


Bagaimana Context Bekerja?
-------------------------

STEP 1: Buat Context
```javascript
const SchoolContext = createContext();
```

STEP 2: Buat Provider Component
```javascript
export const SchoolProvider = ({ children }) => {
  const [schools, setSchools] = useState([]);
  
  const value = {
    schools,
    addSchool: (school) => setSchools([...schools, school]),
    // ... methods lain
  };
  
  return (
    <SchoolContext.Provider value={value}>
      {children}
    </SchoolContext.Provider>
  );
};
```

STEP 3: Wrap App dengan Provider
```javascript
function App() {
  return (
    <SchoolProvider>
      <SekolahPage />
      <WebGISPage />
    </SchoolProvider>
  );
}
```

STEP 4: Akses di Komponen
```javascript
function SekolahPage() {
  const { schools, addSchool } = useSchool();
  // ... gunakan schools & addSchool
}
```


Flow Detail: Saat User Tambah Sekolah
------------------------------------

Timeline:
┌─ T=0ms  User klik "Tambah Sekolah"
│
├─ T=10ms  SekolahPage.handleAddSekolah() berjalan
│          - API call ke backend
│          - Call addSchool() dari context
│
├─ T=50ms  Context.setSchools() trigger
│          - schools state berubah
│          - Semua komponen listening ke context
│          - sekolahData di WebGISPage jadi stale
│
├─ T=51ms  useEffect WebGISPage trigger
│          (dependency: sekolahData)
│          - updateMarkers() dipanggil
│          - Marker baru ditambah ke peta
│
└─ T=55ms  User lihat marker baru di peta ✨
           (Total: 55ms - INSTANT untuk user!)


Why useSchool Hook?
------------------

Custom hook mempermudah akses context:

TANPA hook (verbose):
```javascript
import { useContext } from 'react';
import SchoolContext from '../contexts/SchoolContext';

function MyComponent() {
  const { schools } = useContext(SchoolContext);
}
```

DENGAN hook (clean):
```javascript
import { useSchool } from '../contexts/SchoolContext';

function MyComponent() {
  const { schools } = useSchool();
}
```


Re-render Strategy: Kapan Komponen Update?
------------------------------------------

React Context akan trigger re-render saat:
1. Context value berubah
2. Komponen subscribed ke context itu

Contoh di implementasi kami:

SekolahPage:
  const { schools, addSchool } = useSchool();
  
  - Component ini SUBSCRIBE ke "schools"
  - Saat schools berubah → component re-render
  - schools digunakan untuk filter & display

WebGISPage:
  const { schools } = useSchool();
  const sekolahData = ... // merge dengan context
  
  useEffect(() => {
    updateMarkers();
  }, [sekolahData]); // dependency tracking
  
  - sekolahData berubah → useEffect trigger
  - updateMarkers() dijalankan
  - Marker di peta di-update


Performance Optimization Tips
----------------------------

1. Split Context jika besar:
   // ❌ BAD - satu context besar
   <SchoolContext>  // schools, sppg, evaluasi, analisis, dll
   
   // ✅ GOOD - split by domain
   <SchoolContext>
   <SPPGContext>
   <EvaluasiContext>

2. Gunakan useCallback untuk prevent unnecessary updates:
   const addSchool = useCallback((school) => {
     setSchools([...schools, school]);
   }, [schools]);

3. Consider useMemo jika value object kompleks:
   const value = useMemo(() => ({
     schools,
     addSchool,
   }), [schools, addSchool]);

4. Monitor DevTools untuk re-render:
   - React DevTools → Profiler tab
   - Lihat component mana yang re-render


Comparison: Context vs Alternatives
-----------------------------------

Context API (Kami gunakan):
✅ Built-in React
✅ Simple untuk medium projects
✅ No dependency
✅ Good untuk UI state
❌ Less optimal for frequent updates
❌ Overkill untuk very simple state

Redux:
✅ Excellent untuk complex state
✅ Time-travel debugging
✅ Middleware ecosystem
❌ Boilerplate code
❌ Learning curve

Zustand:
✅ Minimal boilerplate
✅ Good performance
✅ Simple API
❌ Less ecosystem
❌ Less proven

useReducer (Built-in):
✅ Good untuk complex state
✅ No dependency
❌ More verbose
❌ Not global (context needed)

Untuk project kami: Context API cocok! 🎉


Advanced Pattern: Context dengan useReducer
------------------------------------------

Jika logic kompleks, combine dengan useReducer:

```javascript
const schoolReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SCHOOL':
      return [...state, action.payload];
    case 'DELETE_SCHOOL':
      return state.filter(s => s.id !== action.payload);
    default:
      return state;
  }
};

export const SchoolProvider = ({ children }) => {
  const [schools, dispatch] = useReducer(schoolReducer, []);
  
  const addSchool = (school) => {
    dispatch({ type: 'ADD_SCHOOL', payload: school });
  };
  
  // ... rest
};
```

Benefit:
- More predictable state updates
- Easier to test
- Scalable untuk logic kompleks


Common Pitfalls & Solutions
---------------------------

❌ Pitfall 1: Forget Provider wrap
```javascript
// ❌ WRONG - Context tidak wrapped
function App() {
  return <SekolahPage />; // useSchool() akan error!
}

// ✅ CORRECT
function App() {
  return (
    <SchoolProvider>
      <SekolahPage />
    </SchoolProvider>
  );
}
```

❌ Pitfall 2: Object reference issue
```javascript
// ❌ WRONG - value object baru tiap render
<SchoolContext.Provider value={{ schools, addSchool }}>

// ✅ CORRECT - memoized value
const value = useMemo(() => ({ schools, addSchool }), [schools]);
<SchoolContext.Provider value={value}>
```

❌ Pitfall 3: useSchool without Provider
```javascript
// ❌ WRONG - throw error "useSchool must be used in SchoolProvider"
function StandaloneComponent() {
  const { schools } = useSchool(); // Error!
}

// ✅ CORRECT - use jika dalam Provider tree
function AppComponent() {
  const { schools } = useSchool(); // OK - inside <SchoolProvider>
}
```


Real-World Example Analysis: Kita Sekarang
------------------------------------------

Structure kami:
```
App.js
└─ <SchoolProvider>  ← Provides global context
   ├─ SekolahPage   ← Reads & writes to context
   │  └─ Uses addSchool() to update
   │
   └─ WebGISPage    ← Reads from context
      └─ Auto updates when context changes
      └─ useEffect listening to dependency
```

Why Context Shine di sini:
1. Both pages need same data
2. Changes di SekolahPage harus reflect di WebGISPage
3. No extra state management library needed
4. Clean, React-native solution


Debugging Context Issues
------------------------

1. Check if wrapped in Provider:
   const { schools } = useSchool(); // Should not throw error

2. Use React DevTools:
   - Install React DevTools browser extension
   - Check Component tab → find SchoolProvider
   - See context value changing

3. Add console logs:
   useEffect(() => {
     console.log('Schools updated:', schools);
   }, [schools]);

4. Trace updates:
   const addSchool = useCallback((school) => {
     console.log('Adding school:', school);
     setSchools(prev => [...prev, school]);
   }, []);


Next Steps: Extend Context
--------------------------

Sekarang bisa tambah context baru untuk:
1. SPPGContext - manage SPPG data
2. EvaluasiContext - manage evaluasi data
3. AuthContext - manage user authentication
4. UIContext - manage global UI state (theme, sidebar, etc)

Pattern tetap sama:
```javascript
export const [FeatureName]Provider = ({ children }) => {
  const [state, setState] = useState(...);
  return (
    <[FeatureName]Context.Provider value={{ state }}>
      {children}
    </[FeatureName]Context.Provider>
  );
};
```


Key Takeaways
------------

1. Context API solve prop-drilling problem
2. Create context → Provider → useContext hook
3. Changes automatically propagate ke semua subscribers
4. Good untuk medium-sized state
5. Performance fine untuk most use cases
6. Combine dengan useReducer untuk complex logic
7. Monitor performance dengan DevTools


Kesimpulan
---------

Context API membuat aplikasi lebih:
- ✅ Maintainable (single source of truth)
- ✅ Scalable (easy to add features)
- ✅ Professional (modern React pattern)
- ✅ User-friendly (instant updates)

Untuk kasus kami: SekolahPage ↔ WebGISPage sync
→ Context API adalah pilihan PERFECT! 🎉


Resources untuk Belajar Lebih Lanjut:
-----------------------------------
1. Official React Docs: https://react.dev/reference/react/useContext
2. React Context Best Practices
3. Performance Optimization Guide
4. Custom Hooks Patterns
5. Real-world Context examples


---
Created: January 14, 2026
Difficulty Level: Intermediate
Estimated Reading Time: 15-20 minutes
