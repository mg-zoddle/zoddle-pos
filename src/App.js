import React, { useState, useEffect, useRef } from 'react';

// --- BUILT-IN ICONS (No external dependencies required) ---
const Icon = ({ className, children }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>
);
const Wifi = ({className}) => <Icon className={className}><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></Icon>;
const WifiOff = ({className}) => <Icon className={className}><line x1="2" y1="2" x2="22" y2="22"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/><path d="M5 12.55a11 11 0 0 1 14.08 0"/></Icon>;
const CloudUpload = ({className}) => <Icon className={className}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></Icon>;
const ShoppingCart = ({className}) => <Icon className={className}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></Icon>;
const Trash2 = ({className}) => <Icon className={className}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></Icon>;
const Camera = ({className}) => <Icon className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></Icon>;
const CheckCircle = ({className}) => <Icon className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Icon>;
const X = ({className}) => <Icon className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Icon>;
const QrCode = ({className}) => <Icon className={className}><rect x="3" y="3" width="5" height="5" rx="1" ry="1"/><rect x="16" y="3" width="5" height="5" rx="1" ry="1"/><rect x="3" y="16" width="5" height="5" rx="1" ry="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></Icon>;
const Search = ({className}) => <Icon className={className}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>;
const FileText = ({className}) => <Icon className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></Icon>;
const Lock = ({className}) => <Icon className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Icon>;
const ShieldCheck = ({className}) => <Icon className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></Icon>;
const ListIcon = ({className}) => <Icon className={className}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></Icon>;
const ChevronLeft = ({className}) => <Icon className={className}><polyline points="15 18 9 12 15 6"/></Icon>;
const ChevronRight = ({className}) => <Icon className={className}><polyline points="9 18 15 12 9 6"/></Icon>;
const RefreshCw = ({className}) => <Icon className={className}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></Icon>;

const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwBTDf-XDTt9fo4dUli_s0dL7ivT6lW0IE8BbeLZWBCIPM_pwBIsSb_NIK8Lssk9VVJ/exec';

// --- SECURITY CONFIGURATION ---
const APP_PIN = "1234"; // 🔒 CHANGE THIS to your desired passcode

// --- Utility Functions ---
const getUniformTimestamp = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

const generateOrderId = () => `ZORD-${Date.now().toString(36).toUpperCase()}`;

// --- ENCRYPTION HELPERS ---
const encryptData = (data, key) => {
  const text = JSON.stringify(data);
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(encodeURIComponent(result));
};

const decryptData = (b64, key) => {
  try {
    const text = decodeURIComponent(atob(b64));
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return JSON.parse(result);
  } catch (e) {
    return null;
  }
};

// Image Compressor
const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // 800px max width
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.6));
      };
    };
  });
};

export default function App() {
  // --- Security State ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [authError, setAuthError] = useState(false);

  // --- App State ---
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [inventory, setInventory] = useState([]);
  const [discountMap, setDiscountMap] = useState({});
  const [orderDatabase, setOrderDatabase] = useState([]); // Stores auto-fill DB (Last 50)
  const [syncQueue, setSyncQueue] = useState([]);
  const [auditLog, setAuditLog] = useState([]); // Persistent Local Log
  const [status, setStatus] = useState({ type: 'info', text: 'Initializing...' });
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false); 
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [selectedAuditOrderId, setSelectedAuditOrderId] = useState(null);
  
  // Draft Tracking Reference
  const draftLoaded = useRef(false);

  // Order Header State
  const [orderId, setOrderId] = useState(generateOrderId()); // Internal tracking ZORD-xxx ID
  const [preAssignedId, setPreAssignedId] = useState(''); // Search box state & final Pre-Assigned ID
  const [lastAutoFilledId, setLastAutoFilledId] = useState(''); // Tracks autofill to prevent overrides
  const [customer, setCustomer] = useState({ name: '', phone: '', realPhone: '', executive: '', discountCode: '' });
  const [paymentMethod, setPaymentMethod] = useState('Online');
  const [orderType, setOrderType] = useState(null); // NEW: Defaults to null to hide cart initially

  // Current Item Form State
  const [itemForm, setItemForm] = useState({ sku: '', brand: '', size: '0-1M', gender: '', mrp: '', zrp: '', units: 1, photoData: null });
  const [isSkuLocked, setIsSkuLocked] = useState(false);
  const [formError, setFormError] = useState("");
  const fileInputRef = useRef(null);

  // Cart State
  const [cart, setCart] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  // --- Network & PWA Listeners ---
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => console.log('Service Worker registered with scope:', registration.scope))
        .catch(error => console.log('Service Worker registration failed:', error));
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // --- Authentication Handler ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === APP_PIN) {
      setIsAuthenticated(true);
      setAuthError(false);
      loadEncryptedData();
      fetchInventory(false); 
    } else {
      setAuthError(true);
      setPinInput("");
    }
  };

  // --- Data Loading & Syncing ---
  const loadEncryptedData = () => {
    const savedQueue = localStorage.getItem('zoddle_secure_queue');
    if (savedQueue) {
      const decrypted = decryptData(savedQueue, APP_PIN);
      if (decrypted) setSyncQueue(decrypted);
    }
    
    const savedLog = localStorage.getItem('zoddle_audit_log');
    if (savedLog) {
      const decryptedLog = decryptData(savedLog, APP_PIN);
      if (decryptedLog) setAuditLog(decryptedLog);
    }
    
    const cachedDb = localStorage.getItem('zoddle_order_db');
    if (cachedDb) setOrderDatabase(JSON.parse(cachedDb));

    // Load unsubmitted draft order state
    const savedDraft = localStorage.getItem('zoddle_draft_order');
    if (savedDraft) {
      const decryptedDraft = decryptData(savedDraft, APP_PIN);
      if (decryptedDraft) {
        if (decryptedDraft.cart) setCart(decryptedDraft.cart);
        if (decryptedDraft.customer) setCustomer(decryptedDraft.customer);
        if (decryptedDraft.preAssignedId) setPreAssignedId(decryptedDraft.preAssignedId);
        if (decryptedDraft.paymentMethod) setPaymentMethod(decryptedDraft.paymentMethod);
        if (decryptedDraft.orderId) setOrderId(decryptedDraft.orderId);
        if (decryptedDraft.lastAutoFilledId) setLastAutoFilledId(decryptedDraft.lastAutoFilledId);
        if (decryptedDraft.orderType) setOrderType(decryptedDraft.orderType);
      }
    }
    draftLoaded.current = true;
  };

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('zoddle_secure_queue', encryptData(syncQueue, APP_PIN));
    }
  }, [syncQueue, isAuthenticated]);

  // Save Draft Order State automatically whenever it changes
  useEffect(() => {
    if (isAuthenticated && draftLoaded.current) {
      const draft = { cart, customer, preAssignedId, paymentMethod, orderId, lastAutoFilledId, orderType };
      localStorage.setItem('zoddle_draft_order', encryptData(draft, APP_PIN));
    }
  }, [cart, customer, preAssignedId, paymentMethod, orderId, lastAutoFilledId, orderType, isAuthenticated]);

  const logOrderLocally = (payload, status) => {
    setAuditLog(prev => {
      const newLog = [{
        id: payload.orderId, 
        time: payload.timestamp,
        name: payload.customer || 'No Purchase',
        amount: payload.totalAmount,
        status: status,
        units: payload.totalUnits,
        fullDetails: payload 
      }, ...prev];

      let stored = false;
      let currentLog = [...newLog].slice(0, 40); 
      
      while (!stored && currentLog.length > 0) {
        try {
          localStorage.setItem('zoddle_audit_log', encryptData(currentLog, APP_PIN));
          stored = true;
        } catch (e) {
          currentLog.pop();
        }
      }
      return currentLog;
    });
  };

  const updateAuditLogStatus = (orderId, newStatus) => {
    setAuditLog(prev => {
      const newLog = prev.map(entry => entry.id === orderId ? { ...entry, status: newStatus } : entry);
      localStorage.setItem('zoddle_audit_log', encryptData(newLog, APP_PIN));
      return newLog;
    });
  };

  const fetchInventory = async (isSilent = false) => {
    if (!isSilent) setIsFetching(true);
    try {
      if (!navigator.onLine) throw new Error("Offline");

      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      
      if (data && data.inventory) {
        setInventory(data.inventory);
        setDiscountMap(data.discountMap || {});
        
        const freshOrderDb = data.orderDatabase || [];
        setOrderDatabase(freshOrderDb);
        
        localStorage.setItem('zoddle_inventory', JSON.stringify(data.inventory));
        localStorage.setItem('zoddle_discount_map', JSON.stringify(data.discountMap || {}));
        localStorage.setItem('zoddle_order_db', JSON.stringify(freshOrderDb));
        
        if (!isSilent) setStatus({ type: 'success', text: 'Data Synced' });
      } else {
        throw new Error("Invalid format");
      }
    } catch (e) {
      const cachedInv = localStorage.getItem('zoddle_inventory');
      const cachedMap = localStorage.getItem('zoddle_discount_map');
      if (cachedInv) {
        setInventory(JSON.parse(cachedInv));
        if (cachedMap) setDiscountMap(JSON.parse(cachedMap));
        if (!isSilent) setStatus({ type: 'warning', text: 'Offline Mode: Using cached data' });
      } else {
        if (!isSilent) setStatus({ type: 'error', text: 'Offline Mode: No data cached' });
      }
    }
    if (!isSilent) setIsFetching(false);
  };

  // Start data download silently the moment the app loads
  useEffect(() => {
    fetchInventory(true);
  }, []);

  // Background Auto-Refresh every 2 minutes
  useEffect(() => {
    let interval;
    if (isAuthenticated && isOnline) {
      interval = setInterval(() => {
        fetchInventory(true); 
      }, 120000); 
    }
    return () => clearInterval(interval);
  }, [isAuthenticated, isOnline]);

  const syncOfflineQueue = async () => {
    if (syncQueue.length === 0 || !isOnline || isSaving) return;
    setIsSaving(true);
    setStatus({ type: 'warning', text: `Syncing ${syncQueue.length} offline orders...` });

    let newQueue = [...syncQueue];
    for (let i = syncQueue.length - 1; i >= 0; i--) {
      try {
        await fetch(API_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors', 
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(syncQueue[i])
        });
        
        updateAuditLogStatus(syncQueue[i].orderId, 'SYNCED');
        newQueue.splice(i, 1);
      } catch (err) {
        console.error("Failed to sync item", err);
      }
    }
    
    setSyncQueue(newQueue);
    setIsSaving(false);
    setStatus({ type: 'success', text: newQueue.length === 0 ? 'All offline orders synced!' : `${newQueue.length} orders failed to sync.` });
  };

  const resubmitAuditOrder = async (orderId) => {
    let payloadToSync = syncQueue.find(q => q.orderId === orderId);
    let isForceSync = false;

    if (!payloadToSync) {
      const auditEntry = auditLog.find(log => log.id === orderId);
      if (auditEntry && auditEntry.fullDetails) {
        payloadToSync = auditEntry.fullDetails;
        isForceSync = true;
      } else {
        setStatus({ type: 'error', text: 'Order data not found locally.' });
        return;
      }
    }

    setIsSaving(true);
    setStatus({ type: 'warning', text: isForceSync ? 'Force re-syncing order...' : 'Resubmitting order...' });

    try {
      await fetch(API_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payloadToSync)
      });
      
      updateAuditLogStatus(orderId, 'SYNCED');
      if (!isForceSync) {
        setSyncQueue(prev => prev.filter(q => q.orderId !== orderId));
      }
      setStatus({ type: 'success', text: `Order synced successfully!` });
    } catch (err) {
      setStatus({ type: 'error', text: 'Resubmit failed. Please check your connection.' });
    }
    setIsSaving(false);
  };

  // --- Form Handlers ---
  const handlePreAssignedIdChange = (e) => {
    const val = e.target.value;
    setPreAssignedId(val);
    
    const searchVal = val.trim().toUpperCase();
    if (!searchVal) {
      setCustomer(prev => ({ ...prev, name: '', phone: '', realPhone: '', discountCode: '' }));
      setLastAutoFilledId(''); 
      return;
    }
  };

  // Auto-populate effect
  useEffect(() => {
    const searchVal = preAssignedId.trim().toUpperCase();
    if (!searchVal || orderDatabase.length === 0) return;

    if (lastAutoFilledId === searchVal) return;

    const match = orderDatabase.find(o => String(o.orderId).trim().toUpperCase() === searchVal);
    if (match) {
      let maskedPhone = match.phone;
      if (maskedPhone && maskedPhone.length >= 4) {
        maskedPhone = '*'.repeat(maskedPhone.length - 4) + maskedPhone.slice(-4);
      } else if (maskedPhone) {
        maskedPhone = '*'.repeat(maskedPhone.length);
      }
      
      setCustomer(prev => ({
        ...prev,
        name: match.name || prev.name,
        phone: maskedPhone || prev.phone,
        realPhone: match.phone || prev.realPhone,
        discountCode: match.discountCode || prev.discountCode
      }));
      setLastAutoFilledId(searchVal);
    }
  }, [orderDatabase, preAssignedId, lastAutoFilledId]);

  const handleSkuSearch = (e) => {
    const sku = e.target.value.toUpperCase();
    setFormError(""); 
    if (!sku) {
      setItemForm(prev => ({ ...prev, sku: '', brand: '', size: '0-1M', gender: '', mrp: '', zrp: '', photoData: null }));
      setIsSkuLocked(false);
      return;
    }

    const match = inventory.find(i => i.sku?.toString().toUpperCase() === sku);
    if (match) {
      setItemForm(prev => ({
        ...prev, sku, brand: match.brand || '', size: match.size || '0-1M', gender: match.gender || '', mrp: match.mrp || '', zrp: match.zrp || '', photoData: null
      }));
      setIsSkuLocked(true);
    } else {
      setItemForm(prev => ({ ...prev, sku }));
      if (isSkuLocked) {
        setItemForm(prev => ({ ...prev, brand: '', mrp: '', zrp: '', photoData: null }));
        setIsSkuLocked(false);
      }
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const compressedBase64 = await compressImage(file);
    setItemForm(prev => ({ ...prev, photoData: compressedBase64 }));
    setFormError(""); 
  };

  const addToCart = () => {
    if (!itemForm.sku || !itemForm.zrp) {
      setFormError("SKU and ZRP Price are required.");
      return;
    }
    
    if (!isSkuLocked && !itemForm.photoData) {
      setFormError("📸 A photo is mandatory for new product entries.");
      return;
    }

    const finalUnits = parseInt(itemForm.units) || 1; 

    setFormError(""); 
    setCart([...cart, { ...itemForm, units: finalUnits, mrp: parseFloat(itemForm.mrp) || 0, zrp: parseFloat(itemForm.zrp) }]);
    setItemForm({ sku: '', brand: '', size: '0-1M', gender: '', mrp: '', zrp: '', units: 1, photoData: null });
    setIsSkuLocked(false);
  };

  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));

  const calculateTotals = () => {
    const gross = cart.reduce((sum, item) => sum + (item.zrp * item.units), 0);
    const totalUnits = cart.reduce((sum, item) => sum + item.units, 0);
    let discount = 0;
    let workingText = "";
    
    const enteredCode = customer.discountCode.trim().toUpperCase();
    let code = ""; 
    let mapNote = "";

    if (enteredCode) {
      const safeMap = {};
      Object.keys(discountMap || {}).forEach(k => {
        safeMap[k.trim().toUpperCase()] = discountMap[k]?.toString().trim().toUpperCase();
      });

      if (safeMap[enteredCode]) {
        code = safeMap[enteredCode];
        if (code !== enteredCode) {
          mapNote = ` (Mapped to base code: ${code})`;
        }
      } else if (Object.keys(safeMap).length === 0) {
        code = enteredCode;
      } else {
        code = "INVALID"; 
      }
    }

    if (code === 'ZODDLE') {
      let pct = 0.10;
      let logicText = "Total units ≤ 3 (10% off)";
      
      if (totalUnits >= 8) {
        pct = 0.30;
        logicText = "Total units ≥ 8 (30% off)";
      } else if (totalUnits > 3) {
        pct = 0.20;
        logicText = "Total units 4-7 (20% off)";
      }
      
      discount = gross * pct;
      workingText = `• Code ${enteredCode}${mapNote} applied.\n• Logic: ${logicText}\n• Calculation: ₹${gross.toFixed(2)} × ${pct*100}% = ₹${discount.toFixed(2)}`;
    } else if (code === 'ZOD30') {
      discount = gross * 0.30;
      workingText = `• Code ${enteredCode}${mapNote} applied.\n• Logic: Flat 30% discount on cart.\n• Calculation: ₹${gross.toFixed(2)} × 30% = ₹${discount.toFixed(2)}`;
    } else if (code === 'ZOD200') {
      let baseDisc = 200;
      let extraDisc = 0;
      workingText = `• Code ${enteredCode}${mapNote} applied.\n• Base Discount: ₹200 flat off.`;
      if (totalUnits >= 4) {
          extraDisc = (gross - baseDisc) * 0.10;
          workingText += `\n• Extra Discount: Cart has 4+ items. Additional 10% off remaining total.\n• Calculation: (₹${gross.toFixed(2)} - ₹200) × 10% = ₹${extraDisc.toFixed(2)}`;
      }
      discount = baseDisc + extraDisc;
      workingText += `\n• Total Saving: ₹${discount.toFixed(2)}`;
    } else if (code === 'B2G1') {
      let flatList = [];
      cart.forEach(i => { for (let u = 0; u < i.units; u++) flatList.push(i.zrp); });
      flatList.sort((a, b) => b - a);
      if (flatList.length >= 3) {
        const freeItem = flatList[2];
        discount += freeItem;
        workingText = `• Code ${enteredCode}${mapNote} applied.\n• Logic: Buy 2 Get 1 Free (cheapest of top 3 is free).\n• Free Item Value: ₹${freeItem.toFixed(2)}`;
        if (flatList.length >= 4) {
          let addl = flatList.slice(3).reduce((a, b) => a + (b * 0.10), 0);
          discount += addl;
          workingText += `\n• Logic: 10% flat discount on 4th item onwards.\n• Calculation: Remaining ₹${(flatList.slice(3).reduce((a,b)=>a+b,0)).toFixed(2)} × 10% = ₹${addl.toFixed(2)}`;
        }
      } else {
        workingText = `• Code ${enteredCode}${mapNote}: Minimum 3 items required in cart.`;
      }
    } else if (code === 'B3G1') {
      let flatList = [];
      cart.forEach(i => { for (let u = 0; u < i.units; u++) flatList.push(i.zrp); });
      flatList.sort((a, b) => b - a);
      if (flatList.length >= 4) {
        const discountedItemValue = flatList[3] - 1; 
        discount += discountedItemValue;
        workingText = `• Code ${enteredCode}${mapNote} applied.\n• Logic: Buy 3 Get 1 at ₹1 (4th highest is ₹1).\n• 4th Item Discount: ₹${discountedItemValue.toFixed(2)}`;
        if (flatList.length >= 5) {
          let addl = flatList.slice(4).reduce((a, b) => a + (b * 0.10), 0);
          discount += addl;
          workingText += `\n• Logic: 10% flat discount on 5th item onwards.\n• Calculation: Remaining ₹${(flatList.slice(4).reduce((a,b)=>a+b,0)).toFixed(2)} × 10% = ₹${addl.toFixed(2)}`;
        }
      } else {
        discount = gross * 0.10;
        workingText = `• Code ${enteredCode}${mapNote} applied.\n• Logic: Fewer than 4 items. Flat 10% discount applied.\n• Calculation: ₹${gross.toFixed(2)} × 10% = ₹${discount.toFixed(2)}`;
      }
    } else if (code === 'ZODREPEAT') {
      let pct = 0.20;
      let logicText = "Total units ≤ 3 (20% off)";
      if (totalUnits >= 4) {
        pct = 0.30;
        logicText = "Total units ≥ 4 (30% off)";
      }
      discount = gross * pct;
      workingText = `• Code ${enteredCode}${mapNote} applied.\n• Logic: ${logicText}\n• Calculation: ₹${gross.toFixed(2)} × ${pct*100}% = ₹${discount.toFixed(2)}`;
    } else if (code === 'REFZOD') {
      let pct = 0.15;
      let logicText = "Total units ≤ 3 (15% off)";
      if (totalUnits >= 4) {
        pct = 0.25;
        logicText = "Total units ≥ 4 (25% off)";
      }
      discount = gross * pct;
      workingText = `• Code ${enteredCode}${mapNote} applied.\n• Logic: ${logicText}\n• Calculation: ₹${gross.toFixed(2)} × ${pct*100}% = ₹${discount.toFixed(2)}`;
    } else if (code === 'ZOD500') {
      if (gross > 1000) {
        discount = 500 + (Math.floor((gross - 1000) / 1000) * 200);
        discount = Math.min(discount, 2000);
        workingText = `• Code ${enteredCode}${mapNote} applied.\n• Logic: ₹500 off base (>₹1000) + ₹200 per subsequent full ₹1000 (Max ₹2000).\n• Calculation Total: ₹${discount.toFixed(2)}`;
      } else {
        workingText = `• Code ${enteredCode}${mapNote}: Gross total must be above ₹1000.`;
      }
    } else if (code === 'ZODR200') {
      discount = 200;
      workingText = `• Code ${enteredCode}${mapNote} applied.\n• Logic: Flat ₹200 off.\n• Total Saving: ₹${discount.toFixed(2)}`;
    } else if (code === 'ZODR100') {
      discount = 100;
      workingText = `• Code ${enteredCode}${mapNote} applied.\n• Logic: Flat ₹100 off.\n• Total Saving: ₹${discount.toFixed(2)}`;
    } else if (code === 'ZODR50') {
      discount = 50;
      workingText = `• Code ${enteredCode}${mapNote} applied.\n• Logic: Flat ₹50 off.\n• Total Saving: ₹${discount.toFixed(2)}`;
    } else if (code === 'ZOD5P') {
      discount = gross * 0.05;
      workingText = `• Code ${enteredCode}${mapNote} applied.\n• Logic: Flat 5% discount.\n• Calculation: ₹${gross.toFixed(2)} × 5% = ₹${discount.toFixed(2)}`;
    } else if (code === 'ZOD10P') {
      discount = gross * 0.10;
      workingText = `• Code ${enteredCode}${mapNote} applied.\n• Logic: Flat 10% discount.\n• Calculation: ₹${gross.toFixed(2)} × 10% = ₹${discount.toFixed(2)}`;
    } else if (code === 'ZOD15P') {
      discount = gross * 0.15;
      workingText = `• Code ${enteredCode}${mapNote} applied.\n• Logic: Flat 15% discount.\n• Calculation: ₹${gross.toFixed(2)} × 15% = ₹${discount.toFixed(2)}`;
    } else if (enteredCode) {
       workingText = `• Discount code entered but not recognized or is inactive.`;
    }

    discount = Math.min(discount, gross);
    return { gross, discount, totalUnits, net: gross - discount, workingText };
  };

  const totals = calculateTotals();
  
  // Validation adjusts based on whether it is a Sale or an Unsuccessful Session
  const isReadyToSubmit = orderType === 'SALE'
    ? (cart.length > 0 && customer.name.trim() !== '' && customer.executive.trim() !== '' && preAssignedId.trim() !== '')
    : (preAssignedId.trim() !== '' && customer.executive.trim() !== '');

  const submitOrder = async () => {
    if (isSaving) return;

    let finalPhone = customer.phone.trim();
    if (finalPhone.includes('*') && customer.realPhone) {
      finalPhone = customer.realPhone;
    }
    
    const payload = {
      apiToken: APP_PIN, 
      orderId: orderId,
      preAssignedId: preAssignedId.trim().toUpperCase(),
      timestamp: getUniformTimestamp(),
      customer: customer.name.trim(),
      phone: finalPhone, 
      executive: customer.executive.trim(),
      totalUnits: orderType === 'SALE' ? totals.totalUnits : 0,
      totalAmount: orderType === 'SALE' ? totals.net : 0,
      discountCode: orderType === 'SALE' ? (customer.discountCode.trim().toUpperCase() || "NONE") : "NONE",
      discountAmount: orderType === 'SALE' ? totals.discount : 0,
      paymentMethod: orderType === 'SALE' ? paymentMethod : "N/A",
      lineItems: orderType === 'SALE' ? cart : [],
      orderType: orderType // Passes 'SALE', 'RTO', or 'DOL' to Backend
    };

    setIsSaving(true);
    setStatus({ type: 'warning', text: 'Connecting to Server...' });

    try {
      await fetch(API_ENDPOINT, {
        method: 'POST', 
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' }, 
        body: JSON.stringify(payload)
      });
      
      logOrderLocally(payload, 'SYNCED');
      finishOrderSubmission();
    } catch (err) {
      setSyncQueue([...syncQueue, payload]);
      logOrderLocally(payload, 'OFFLINE_PENDING');
      setStatus({ type: 'error', text: 'Error detected. Saved to Secure Offline Queue.' });
      resetForm();
    }
  };

  const finishOrderSubmission = () => {
    setStatus({ type: 'success', text: `${orderType === 'SALE' ? 'Order' : 'Status'} captured successfully!` });
    resetForm();
  };

  const resetForm = () => {
    setCart([]); setOrderId(generateOrderId());
    setPreAssignedId('');
    setLastAutoFilledId(''); 
    setCustomer({ name: '', phone: '', realPhone: '', executive: '', discountCode: '' });
    setPaymentMethod('Online'); 
    setOrderType(null); // Reset toggle so it hides cart for next order
    setShowSummary(false); setIsSaving(false);
    
    localStorage.removeItem('zoddle_draft_order');

    setTimeout(() => { fetchInventory(false); }, 2000); 
  };

  const activeAuditOrder = auditLog.find(log => log.id === selectedAuditOrderId);

  // --- RENDER LOCK SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg text-center space-y-6">
          <div className="bg-pink-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-pink-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">App Locked</h1>
            <p className="text-sm text-gray-500 mt-2">Enter PIN to access POS & Decrypt Data</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              inputMode="numeric"
              pattern="[0-9]*"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full text-center tracking-[1em] font-mono text-2xl bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-pink-400 outline-none"
              placeholder="••••"
              maxLength={4}
              autoFocus
            />
            {authError && <p className="text-red-500 text-sm font-bold">Incorrect PIN</p>}
            <button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold p-4 rounded-xl shadow-md transition-colors">
              Unlock Terminal
            </button>
          </form>
          <div className="flex items-center justify-center gap-1 text-xs text-green-600 font-bold mt-4 bg-green-50 p-2 rounded-lg">
             <ShieldCheck className="w-4 h-4" /> End-to-End Encrypted Storage
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER MAIN APP ---
  return (
    <div className="min-h-screen bg-gray-50 pb-24 text-gray-800 font-sans md:p-4">
      {/* Top Navigation & Status Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="p-4 flex justify-between items-center max-w-4xl mx-auto">
          <div>
            <h1 className="text-xl font-bold text-pink-700 leading-tight">Zoddle POS</h1>
            <p className="text-xs text-gray-500">Secure Mobile Edition</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowAuditModal(true)} className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors rounded-full" title="Audit Log">
              <ListIcon className="w-5 h-5"/>
            </button>
            {isOnline ? <Wifi className="text-green-500 w-5 h-5" /> : <WifiOff className="text-red-500 w-5 h-5" />}
            {syncQueue.length > 0 && (
              <button 
                onClick={syncOfflineQueue} disabled={!isOnline || isSaving}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${isOnline ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-gray-200 text-gray-500'}`}
              >
                <CloudUpload className="w-4 h-4" /> <span>{syncQueue.length} Pending</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Dynamic Status Bar */}
        {status.text && status.type !== 'info' && (
          <div className={`px-4 py-2 text-xs text-center font-bold ${status.type === 'error' ? 'bg-red-500 text-white' : status.type === 'warning' ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'}`}>
            {status.text}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Order Header Card */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-700 flex items-center gap-2"><FileText className="w-5 h-5 text-pink-500"/> Order Details</h2>
            <div className="flex items-center gap-3">
              {(cart.length > 0 || preAssignedId || customer.name) && (
                <button onClick={resetForm} className="text-xs text-red-500 font-bold hover:bg-red-50 px-2 py-1 rounded transition-colors">Clear</button>
              )}
              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 font-mono">{orderId}</span>
            </div>
          </div>
          <div className="space-y-3">
            
            <div className="mb-3">
               <div className="flex justify-between items-end mb-1">
                 <label className="text-[10px] font-bold text-indigo-400 uppercase">Pre-Assigned Order ID *</label>
                 
                 <div className="flex items-center gap-2">
                   <span className={`text-[9px] font-bold ${orderDatabase.length > 0 ? 'text-green-500' : 'text-red-400'}`}>
                     {orderDatabase.length} / 50 IDs loaded
                   </span>
                   <button 
                     onClick={() => fetchInventory(false)} 
                     disabled={isFetching}
                     className={`text-gray-400 hover:text-indigo-600 transition-colors ${isFetching ? 'animate-spin text-indigo-400' : ''}`} 
                     title="Force Manual Database Sync"
                   >
                     <RefreshCw className="w-4 h-4"/>
                   </button>
                 </div>
               </div>
               <div className="relative">
                 <input 
                   type="text" 
                   value={preAssignedId} 
                   onChange={handlePreAssignedIdChange} 
                   className="w-full bg-indigo-50 border border-indigo-100 rounded-lg p-2.5 text-sm font-bold uppercase text-indigo-700 focus:ring-2 focus:ring-indigo-300" 
                   placeholder="Required..." 
                 />
                 {preAssignedId && orderDatabase.some(o => String(o.orderId).trim().toUpperCase() === preAssignedId.trim().toUpperCase()) && (
                   <CheckCircle className="w-5 h-5 text-green-500 absolute right-3 top-2.5" />
                 )}
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Customer Name</label>
                <input type="text" value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} className="w-full bg-gray-50 border-0 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-pink-200" placeholder="Optional for RTO/DOL" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Phone</label>
                <input type="tel" value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} className="w-full bg-gray-50 border-0 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-pink-200" placeholder="Optional" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Executive *</label>
                <input type="text" value={customer.executive} onChange={e => setCustomer({...customer, executive: e.target.value})} className="w-full bg-gray-50 border-0 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-pink-200" placeholder="Required" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Discount Code</label>
                <input type="text" value={customer.discountCode} onChange={e => setCustomer({...customer, discountCode: e.target.value})} className="w-full bg-pink-50 text-pink-700 font-bold uppercase border-0 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-pink-200" placeholder="Code" />
              </div>
            </div>
          </div>
        </section>

        {/* --- NEW PROMINENT OUTCOME SELECTION --- */}
        <section className="mb-6 space-y-3">
           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Session Outcome *</h3>
           <button 
             onClick={() => setOrderType('SALE')} 
             className={`w-full p-4 rounded-2xl font-bold border-2 transition-all text-left flex items-center justify-between ${orderType === 'SALE' ? 'bg-pink-50 border-pink-500 text-pink-700 shadow-md shadow-pink-100' : 'bg-white border-gray-100 text-gray-600 shadow-sm hover:border-pink-200'}`}
           >
             <span className="flex items-center gap-3"><ShoppingCart className="w-6 h-6"/> Record Successful Sale</span>
             {orderType === 'SALE' && <CheckCircle className="w-5 h-5"/>}
           </button>
           <div className="grid grid-cols-2 gap-3">
             <button 
               onClick={() => setOrderType('RTO')} 
               className={`p-4 rounded-2xl font-bold border-2 transition-all flex flex-col items-center justify-center gap-2 text-center ${orderType === 'RTO' ? 'bg-orange-50 border-orange-500 text-orange-700 shadow-md shadow-orange-100' : 'bg-white border-gray-100 text-gray-600 shadow-sm hover:border-orange-200'}`}
             >
               <span className="text-2xl mb-1">📦</span>
               <span className="text-sm">No Purchase<br/>(RTO)</span>
             </button>
             <button 
               onClick={() => setOrderType('DOL')} 
               className={`p-4 rounded-2xl font-bold border-2 transition-all flex flex-col items-center justify-center gap-2 text-center ${orderType === 'DOL' ? 'bg-red-50 border-red-500 text-red-700 shadow-md shadow-red-100' : 'bg-white border-gray-100 text-gray-600 shadow-sm hover:border-red-200'}`}
             >
               <span className="text-2xl mb-1">❌</span>
               <span className="text-[11px] sm:text-xs">Customer Cancelled /<br/>No Response</span>
             </button>
           </div>
        </section>

        {/* Garment Form and Cart ONLY show for SALES */}
        {orderType === 'SALE' && (
          <>
            <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
               <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-gray-700 flex items-center gap-2"><Search className="w-5 h-5 text-pink-500"/> Scan / Add Item</h2>
                {itemForm.sku && (
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${isSkuLocked ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {isSkuLocked ? 'Found' : 'New Entry'}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <input type="text" value={itemForm.sku} onChange={handleSkuSearch} className="w-full bg-pink-50 border border-pink-100 rounded-xl p-3 font-mono text-lg uppercase focus:ring-2 focus:ring-pink-300" placeholder="Enter SKU ID..." />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Brand</label>
                    <input type="text" value={itemForm.brand} readOnly={isSkuLocked} onChange={e => setItemForm({...itemForm, brand: e.target.value})} className={`w-full rounded-lg p-2 text-sm border-0 ${isSkuLocked ? 'bg-gray-100 text-gray-500' : 'bg-gray-50 focus:ring-2 focus:ring-pink-200'}`} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Size</label>
                    <select value={itemForm.size} disabled={isSkuLocked} onChange={e => setItemForm({...itemForm, size: e.target.value})} className={`w-full rounded-lg p-2 text-sm border-0 ${isSkuLocked ? 'bg-gray-100 text-gray-500' : 'bg-gray-50 focus:ring-2 focus:ring-pink-200'}`}>
                        <option value="0-1M">Newborn (0-1M)</option>
                        <option value="1-3M">1-3M</option>
                        <option value="3-6M">3-6M</option>
                        <option value="6-12M">6-12M</option>
                        <option value="12-18M">12-18M</option>
                        <option value="18-24M">18-24M</option>
                        <option value="2-3Y">2-3Y</option>
                        <option value="3-4Y">3-4Y</option>
                        <option value="4-5Y">4-5Y</option>
                        <option value="5-6Y">5-6Y</option>
                        <option value="6-7Y">6-7Y</option>
                        <option value="7-8Y">7-8Y</option>
                        <option value="8-9Y">8-9Y</option>
                        <option value="9-10Y">9-10Y</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 items-end">
                  {!isSkuLocked && (
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase">MRP</label>
                      <input type="number" value={itemForm.mrp} onChange={e => setItemForm({...itemForm, mrp: e.target.value})} className="w-full bg-gray-50 border-0 rounded-lg p-2 text-sm" placeholder="₹" />
                    </div>
                  )}
                  <div className={isSkuLocked ? "col-span-2" : ""}>
                    <label className="text-[10px] font-bold text-pink-500 uppercase">ZRP Price</label>
                    <input type="number" value={itemForm.zrp} readOnly={isSkuLocked} onChange={e => setItemForm({...itemForm, zrp: e.target.value})} className={`w-full font-bold text-pink-600 rounded-lg p-2 text-sm border-0 ${isSkuLocked ? 'bg-gray-100' : 'bg-pink-50 ring-1 ring-pink-200'}`} placeholder="₹" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Qty</label>
                    <input 
                      type="number" 
                      min="1" 
                      value={itemForm.units} 
                      onFocus={e => e.target.select()} 
                      onChange={e => setItemForm({...itemForm, units: e.target.value === '' ? '' : parseInt(e.target.value)})} 
                      className="w-full bg-gray-50 border-0 rounded-lg p-2 text-sm text-center font-bold" 
                    />
                  </div>
                </div>

                {!isSkuLocked && itemForm.sku && (
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-dashed border-gray-300">
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" />
                    <button onClick={() => fileInputRef.current.click()} className="flex items-center justify-center gap-2 flex-1 bg-white border border-gray-200 p-2 rounded-lg text-sm text-gray-600 font-medium">
                      <Camera className="w-4 h-4"/> {itemForm.photoData ? 'Change Photo' : 'Take Photo/Gallery'}
                    </button>
                    {itemForm.photoData && <img src={itemForm.photoData} alt="Preview" className="w-10 h-10 object-cover rounded border border-gray-200" />}
                  </div>
                )}

                {formError && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold text-center border border-red-200 animate-in fade-in zoom-in duration-300">
                    {formError}
                  </div>
                )}

                <button onClick={addToCart} className="w-full bg-gray-900 text-white font-bold p-3 rounded-xl shadow-md active:scale-[0.98] transition-transform">
                  Add to Cart
                </button>
              </div>
            </section>

            {cart.length > 0 && (
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="font-bold text-gray-700 flex items-center gap-2"><ShoppingCart className="w-5 h-5 text-pink-500"/> Cart Items</h2>
                  <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full text-xs font-bold">{totals.totalUnits} Units</span>
                </div>

                <div className="divide-y divide-gray-100">
                  {cart.map((item, idx) => (
                    <div key={idx} className="p-4 flex gap-3 items-center">
                      {item.photoData ? (
                        <img src={item.photoData} className="w-12 h-12 rounded object-cover border bg-gray-100 flex-shrink-0" alt="Item" />
                      ) : (
                        <div className="w-12 h-12 rounded bg-gray-100 border flex items-center justify-center text-[8px] text-gray-400 text-center flex-shrink-0">NO IMG</div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="font-mono font-bold text-sm text-gray-900 truncate">{item.sku}</p>
                          <button onClick={() => removeFromCart(idx)} className="p-1 text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4"/></button>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-0.5">{item.brand} • {item.size}</p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs font-medium text-gray-500">{item.units} × ₹{item.zrp}</p>
                          <p className="text-sm font-bold text-gray-900">₹{(item.units * item.zrp).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {totals.workingText && (
                  <div className="p-4 bg-pink-50/50 border-t border-dashed border-pink-200">
                    <h3 className="text-[10px] font-bold text-pink-700 uppercase mb-2">Discount Calculation Working</h3>
                    <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                      {totals.workingText}
                    </p>
                  </div>
                )}

                <div className="p-4 bg-white space-y-2 border-t border-gray-100">
                  <div className="flex justify-between text-sm text-gray-600"><span>Gross Total</span><span>₹{totals.gross.toFixed(2)}</span></div>
                  {totals.discount > 0 && (
                    <div className="flex justify-between text-sm font-bold text-green-600"><span>Discount ({customer.discountCode})</span><span>-₹{totals.discount.toFixed(2)}</span></div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="font-bold text-gray-800">Final Total</span><span className="text-2xl font-black text-pink-600">₹{totals.net.toFixed(2)}</span>
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* Dynamic Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-40">
        <div className="max-w-4xl mx-auto flex gap-3">
          <div className="flex-1">
            {orderType === 'SALE' ? (
              <>
                <p className="text-[10px] text-gray-500 font-bold uppercase">Net Payable</p>
                <p className="text-xl font-black text-gray-900">₹{totals.net.toFixed(2)}</p>
              </>
            ) : orderType ? (
              <>
                <p className="text-[10px] text-gray-500 font-bold uppercase">Selected Action</p>
                <p className="text-xl font-black text-gray-900">{orderType === 'RTO' ? 'Record RTO' : 'Cancelled / No Response'}</p>
              </>
            ) : (
              <>
                <p className="text-[10px] text-gray-500 font-bold uppercase">Action Required</p>
                <p className="text-lg font-bold text-gray-400">Select Outcome</p>
              </>
            )}
          </div>
          <button 
            disabled={!isReadyToSubmit} 
            onClick={() => orderType === 'SALE' ? setShowSummary(true) : submitOrder()}
            className={`px-8 py-3 rounded-xl font-bold text-white flex items-center gap-2 transition-all ${isReadyToSubmit ? (orderType === 'SALE' ? 'bg-pink-600 hover:bg-pink-700 shadow-pink-200' : (orderType === 'RTO' ? 'bg-orange-500 shadow-orange-200' : 'bg-red-500 shadow-red-200')) : 'bg-gray-300'}`}
          >
            {orderType === 'SALE' ? 'Checkout' : (orderType ? 'Submit' : 'Select Action')} <CheckCircle className="w-5 h-5"/>
          </button>
        </div>
      </div>

      {/* Checkout Summary Modal with Invoice View (ONLY FOR SALES) */}
      {showSummary && orderType === 'SALE' && (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold">Review Order</h2>
              <button onClick={() => setShowSummary(false)} className="p-2 bg-gray-200 rounded-full text-gray-600"><X className="w-5 h-5"/></button>
            </div>
            
            <div className="overflow-y-auto p-6 space-y-6 flex-1">
              
              {/* Highlighted Net Payable Amount */}
              <div className="text-center space-y-1">
                <p className="text-sm text-gray-500">Total Payable Amount</p>
                <p className="text-4xl font-black text-pink-600">₹{totals.net.toFixed(2)}</p>
                <p className="text-xs font-mono text-gray-400">System: {orderId} | Ref: {preAssignedId.trim().toUpperCase()}</p>
              </div>
              
              {/* Customer Header Info & Payment Method */}
              <div className="bg-gray-50 p-4 rounded-2xl text-sm space-y-3">
                <div className="flex justify-between"><span className="text-gray-500">Customer</span><span className="font-bold">{customer.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Phone</span><span className="font-bold">{customer.phone || '-'}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Executive</span><span className="font-bold">{customer.executive}</span></div>
                
                {/* Payment Method Toggle */}
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2 uppercase font-bold tracking-wider">Select Payment Method</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setPaymentMethod('Online')} 
                      className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${paymentMethod === 'Online' ? 'bg-pink-600 text-white shadow-md shadow-pink-200' : 'bg-white border border-gray-200 text-gray-600'}`}
                    >
                      UPI / Online
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('Cash')} 
                      className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${paymentMethod === 'Cash' ? 'bg-green-600 text-white shadow-md shadow-green-200' : 'bg-white border border-gray-200 text-gray-600'}`}
                    >
                      Cash
                    </button>
                  </div>
                </div>
              </div>

              {/* Invoice Breakdown Table */}
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="p-2 text-left font-medium">Item</th>
                      <th className="p-2 text-right font-medium">Price</th>
                      <th className="p-2 text-right font-medium">Qty</th>
                      <th className="p-2 text-right font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {cart.map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-2 font-mono font-medium">{item.sku}</td>
                        <td className="p-2 text-right">₹{item.zrp}</td>
                        <td className="p-2 text-right">{item.units}</td>
                        <td className="p-2 text-right font-bold">₹{(item.zrp * item.units).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Aggregate Breakdown inside the table card */}
                <div className="p-3 bg-gray-50 space-y-1 border-t border-gray-100">
                  <div className="flex justify-between text-gray-500">
                    <span>Gross Subtotal ({totals.totalUnits} Units):</span> 
                    <span>₹{totals.gross.toFixed(2)}</span>
                  </div>
                  {totals.discount > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Discount ({customer.discountCode}):</span> 
                      <span>-₹{totals.discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Conditionally Show QR Code only if Online is selected */}
              {paymentMethod === 'Online' && (
                <div className="flex flex-col items-center p-4 border-2 border-dashed border-pink-100 bg-pink-50/50 rounded-2xl animate-in fade-in zoom-in duration-300">
                  <p className="text-xs font-bold text-pink-700 uppercase tracking-wider mb-2">Scan to Pay</p>
                  <img src="https://cdn.shopify.com/s/files/1/0924/1041/3419/files/Zoddle_-_QR_Code.png?v=1771588559" alt="UPI QR" className="w-40 h-40 rounded-xl shadow-sm mix-blend-multiply" />
                </div>
              )}
            </div>
            
            <div className="p-4 border-t bg-white">
              <button onClick={submitOrder} disabled={isSaving} className={`w-full text-white font-bold p-4 rounded-xl shadow-lg text-lg flex justify-center items-center gap-2 ${paymentMethod === 'Cash' ? 'bg-green-600 hover:bg-green-700 shadow-green-200' : 'bg-pink-600 hover:bg-pink-700 shadow-pink-200'}`}>
                {isSaving ? 'Saving...' : (isOnline ? 'Confirm & Save' : 'Save Offline')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Local Audit Log Modal */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 sm:p-0">
          <div className="bg-white w-full max-w-md rounded-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
            
            {!activeAuditOrder ? (
              // --- LIST VIEW ---
              <>
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800"><ListIcon className="w-5 h-5 text-pink-500"/> Audit Log</h2>
                  <button onClick={() => { setShowAuditModal(false); setSelectedAuditOrderId(null); }} className="p-2 bg-gray-200 rounded-full text-gray-600"><X className="w-5 h-5"/></button>
                </div>
                
                <div className="overflow-y-auto p-4 flex-1 space-y-3 bg-gray-50/50">
                  <p className="text-xs text-gray-500 text-center mb-4 font-medium uppercase tracking-wider">Last 40 Transactions</p>
                  
                  {auditLog.length === 0 ? (
                    <div className="text-center text-gray-400 py-10 flex flex-col items-center">
                      <FileText className="w-10 h-10 mb-2 opacity-50" />
                      <p>No local logs found on this device.</p>
                    </div>
                  ) : (
                    auditLog.map((log, i) => (
                      <div 
                        key={i} 
                        onClick={() => setSelectedAuditOrderId(log.id)}
                        className={`border rounded-xl p-3 bg-white shadow-sm flex flex-col gap-2 cursor-pointer hover:bg-gray-50 active:scale-[0.98] transition-all ${log.status === 'OFFLINE_PENDING' ? 'border-amber-300 ring-1 ring-amber-100' : 'border-gray-100'}`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-mono font-bold text-gray-500">{log.id}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider ${log.status === 'SYNCED' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700 animate-pulse'}`}>
                            {log.status === 'SYNCED' ? '✔ SYNCED' : '⚠ PENDING'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-sm text-gray-800">{log.name}</span>
                          <div className="flex items-center gap-1">
                            {log.fullDetails?.orderType && log.fullDetails.orderType !== 'SALE' ? (
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${log.fullDetails.orderType === 'RTO' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                                {log.fullDetails.orderType}
                              </span>
                            ) : (
                              <span className="font-black text-pink-600">₹{log.amount?.toFixed(2)}</span>
                            )}
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                        <div className="text-[10px] font-medium text-gray-400 flex justify-between">
                          <span>{log.time}</span>
                          <span>{log.units > 0 ? `${log.units} Unit(s)` : log.fullDetails?.executive || '-'}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              // --- DETAIL VIEW ---
              <>
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                  <button onClick={() => setSelectedAuditOrderId(null)} className="p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors">
                    <ChevronLeft className="w-5 h-5"/>
                  </button>
                  <h2 className="text-base font-bold flex flex-col items-center text-gray-800">
                    Order Details
                    <span className="text-[10px] font-mono font-normal text-gray-500">{activeAuditOrder.id}</span>
                  </h2>
                  <div className="w-9" />
                </div>
                
                <div className="overflow-y-auto p-4 flex-1 bg-gray-50/50">
                   <div className={`mb-4 p-3 rounded-xl flex items-center justify-between font-bold text-xs border ${activeAuditOrder.status === 'SYNCED' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                      <span>Status:</span>
                      <span>{activeAuditOrder.status === 'SYNCED' ? '✔ Synced to Cloud' : '⚠ Offline Pending'}</span>
                   </div>

                   {activeAuditOrder.fullDetails ? (
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-sm space-y-2">
                          <div className="flex justify-between text-gray-500"><span>Date:</span> <span className="font-medium text-gray-900">{activeAuditOrder.time}</span></div>
                          <div className="flex justify-between text-gray-500"><span>Pre-Assigned ID:</span> <span className="font-bold text-indigo-600">{activeAuditOrder.fullDetails.preAssignedId || '-'}</span></div>
                          <div className="flex justify-between text-gray-500"><span>Customer:</span> <span className="font-bold text-gray-900">{activeAuditOrder.fullDetails.customer || 'N/A'}</span></div>
                          <div className="flex justify-between text-gray-500"><span>Executive:</span> <span className="font-medium text-gray-900">{activeAuditOrder.fullDetails.executive}</span></div>
                          
                          {(!activeAuditOrder.fullDetails.orderType || activeAuditOrder.fullDetails.orderType === 'SALE') && (
                            <>
                              <div className="flex justify-between text-gray-500 pt-2 border-t mt-2"><span>Pay Mode:</span> <span className="font-bold text-gray-900">{activeAuditOrder.fullDetails.paymentMethod}</span></div>
                              <div className="flex justify-between text-gray-500"><span>Discount Code:</span> <span className="font-bold text-pink-600">{activeAuditOrder.fullDetails.discountCode}</span></div>
                            </>
                          )}
                        </div>

                        {activeAuditOrder.fullDetails.orderType === 'RTO' || activeAuditOrder.fullDetails.orderType === 'DOL' ? (
                           <div className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-sm">
                             <FileText className={`w-12 h-12 mx-auto mb-3 ${activeAuditOrder.fullDetails.orderType === 'RTO' ? 'text-orange-400' : 'text-red-400'}`} />
                             <h3 className="text-lg font-bold text-gray-800">
                               {activeAuditOrder.fullDetails.orderType === 'RTO' ? 'No Customer Purchase (RTO)' : 'Customer Cancelled / No Response'}
                             </h3>
                             <p className="text-sm text-gray-500 mt-1">This session was closed without a sale.</p>
                          </div>
                        ) : (
                          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                              <table className="w-full text-xs">
                                <thead className="bg-gray-50 text-gray-500">
                                  <tr>
                                    <th className="p-2 text-left font-medium">Item</th>
                                    <th className="p-2 text-right font-medium">Price</th>
                                    <th className="p-2 text-right font-medium">Qty</th>
                                    <th className="p-2 text-right font-medium">Total</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                  {activeAuditOrder.fullDetails.lineItems?.map((item, idx) => (
                                    <tr key={idx}>
                                      <td className="p-2 font-mono font-medium">
                                        <div className="flex items-center gap-2">
                                          {item.photoData ? (
                                            <img src={item.photoData} className="w-8 h-8 rounded object-cover border bg-gray-100 flex-shrink-0" alt="Item" />
                                          ) : (
                                            <div className="w-8 h-8 rounded bg-gray-100 border flex items-center justify-center text-[6px] text-gray-400 text-center flex-shrink-0">NO IMG</div>
                                          )}
                                          <span>{item.sku}</span>
                                        </div>
                                      </td>
                                      <td className="p-2 text-right">₹{item.zrp}</td>
                                      <td className="p-2 text-right">{item.units}</td>
                                      <td className="p-2 text-right font-bold">₹{(item.zrp * item.units).toFixed(2)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <div className="p-3 bg-gray-50 border-t border-gray-100 text-sm flex justify-between items-center font-bold text-gray-800">
                                 <span>Net Total ({activeAuditOrder.units} units):</span>
                                 <span className="text-lg text-pink-600">₹{activeAuditOrder.amount?.toFixed(2)}</span>
                              </div>
                          </div>
                        )}
                      </div>
                   ) : (
                      <div className="text-center text-gray-400 py-10 flex flex-col items-center">
                        <FileText className="w-8 h-8 opacity-50 mb-2"/>
                        <p className="font-medium text-sm">Older Format</p>
                        <p className="text-xs mt-1">Detailed line-items are not available locally for this older transaction.</p>
                      </div>
                   )}
                </div>
                <div className="p-4 border-t bg-white space-y-3">
                   {activeAuditOrder.status === 'OFFLINE_PENDING' ? (
                      <button 
                         onClick={() => resubmitAuditOrder(activeAuditOrder.id)} 
                         disabled={isSaving} 
                         className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-200 flex justify-center items-center gap-2 transition-colors active:scale-[0.98]"
                      >
                         {isSaving ? <CloudUpload className="w-5 h-5 animate-bounce"/> : <CloudUpload className="w-5 h-5"/>}
                         {isSaving ? 'Submitting...' : 'Resubmit to Cloud'}
                      </button>
                   ) : (
                      <>
                        <p className="text-[10px] text-gray-500 text-center">If this order is missing from the system, you can force a complete re-upload including images.</p>
                        <button 
                           onClick={() => resubmitAuditOrder(activeAuditOrder.id)} 
                           disabled={isSaving} 
                           className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-xl shadow-lg shadow-gray-200 flex justify-center items-center gap-2 transition-colors active:scale-[0.98]"
                        >
                           {isSaving ? <CloudUpload className="w-5 h-5 animate-bounce"/> : <CloudUpload className="w-5 h-5"/>}
                           {isSaving ? 'Submitting...' : 'Force Re-sync to Cloud'}
                        </button>
                      </>
                   )}
                </div>
              </>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}
