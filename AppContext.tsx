import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import type {Crop,FarmerProfile,FpoLot,Grievance,Offer,Sale} from '@/types';
import {demoCrops,demoFarmer,demoFpoLots,demoGrievances,demoOffers,demoSales} from '@/data/simulatedData';
interface AppState{farmer:FarmerProfile;crops:Crop[];offers:Offer[];sales:Sale[];grievances:Grievance[];fpoLots:FpoLot[];addCrop:(c:Omit<Crop,'id'|'createdAt'>)=>void;acceptOffer:(id:string)=>void;declineOffer:(id:string)=>void;advanceSaleStage:(id:string)=>void;addGrievance:(g:Omit<Grievance,'id'|'createdAt'|'status'>)=>void;addFpoLot:(g:Omit<FpoLot,'id'|'status'>)=>void}
const C=createContext<AppState|null>(null);const KEY='farmlink-state-v1';
function load(){try{const r=localStorage.getItem(KEY);if(r)return JSON.parse(r)}catch{}return{farmer:demoFarmer,crops:demoCrops,offers:demoOffers,sales:demoSales,grievances:demoGrievances,fpoLots:demoFpoLots}}
export function AppProvider({children}:{children:ReactNode}){const [s,setS]=useState(load);useEffect(()=>localStorage.setItem(KEY,JSON.stringify(s)),[s]);
const addCrop=(c:Omit<Crop,'id'|'createdAt'>)=>setS((x:any)=>({...x,crops:[...x.crops,{...c,id:`crop-${Date.now()}`,createdAt:Date.now()}]}));
const acceptOffer=(id:string)=>setS((x:any)=>{const o=x.offers.find((a:Offer)=>a.id===id);if(!o)return x;const net=o.offeredPricePerKg*o.quantityKg-o.transportCost-o.storageCost-o.handlingCost-o.otherCost;return{...x,offers:x.offers.map((a:Offer)=>a.id===id?{...a,status:'accepted'}:a),sales:[...x.sales,{id:`sale-${Date.now()}`,cropName:o.cropName,buyerName:o.buyerName,quantityKg:o.quantityKg,netReturn:net,currentStage:'buyer_selected',stages:['crop_listed','buyer_selected'],createdAt:Date.now()}]}});
const declineOffer=(id:string)=>setS((x:any)=>({...x,offers:x.offers.map((o:Offer)=>o.id===id?{...o,status:'declined'}:o)}));
const advanceSaleStage=(id:string)=>setS((x:any)=>({...x,sales:x.sales.map((a:Sale)=>{if(a.id!==id)return a;const stages:['crop_listed','buyer_selected','pickup_scheduled','crop_delivered','payment_processing','payment_received'];const i=stages.indexOf(a.currentStage);const next=stages[Math.min(i+1,stages.length-1)];return{...a,currentStage:next,stages:stages.slice(0,stages.indexOf(next)+1)}})}));
const addGrievance=(g:any)=>setS((x:any)=>({...x,grievances:[...x.grievances,{...g,id:`grievance-${Date.now()}`,status:'open',createdAt:Date.now()}]}));
const addFpoLot=(g:any)=>setS((x:any)=>({...x,fpoLots:[...x.fpoLots,{...g,id:`fpo-${Date.now()}`,status:'open'}]}));
return <C.Provider value={{farmer:s.farmer,crops:s.crops,offers:s.offers,sales:s.sales,grievances:s.grievances,fpoLots:s.fpoLots,addCrop,acceptOffer,declineOffer,advanceSaleStage,addGrievance,addFpoLot}}>{children}</C.Provider>}
export function useApp(){const c=useContext(C);if(!c)throw new Error('useApp must be used within AppProvider');return c}
