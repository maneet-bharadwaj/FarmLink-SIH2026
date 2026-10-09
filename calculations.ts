import type {Crop,MarketOption,Offer} from '@/types';
export interface NetReturnBreakdown{totalValue:number;transportCost:number;storageCost:number;handlingCost:number;otherCost:number;totalCost:number;netReturn:number}
export function calcNetReturn(pricePerKg:number,quantityKg:number,transportCost:number,storageCost:number,handlingCost:number,otherCost:number):NetReturnBreakdown{const totalValue=pricePerKg*quantityKg;const totalCost=transportCost+storageCost+handlingCost+otherCost;return{totalValue,transportCost,storageCost,handlingCost,otherCost,totalCost,netReturn:totalValue-totalCost}}
export function calcOptionNetReturn(o:MarketOption,q:number){return calcNetReturn(o.pricePerKg,q,o.transportCost,o.storageCost,o.handlingCost,o.otherCost)}
export function calcOfferNetReturn(o:Offer){return calcNetReturn(o.offeredPricePerKg,o.quantityKg,o.transportCost,o.storageCost,o.handlingCost,o.otherCost)}
export function rankOptions(options:MarketOption[],q:number){return options.map(option=>({option,breakdown:calcOptionNetReturn(option,q)})).sort((a,b)=>b.breakdown.netReturn-a.breakdown.netReturn)}
export function formatINR(n:number){return '₹'+Math.round(n).toLocaleString('en-IN')}
export function formatDate(s:string){return new Date(s).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
export function getCropOptions(_crop:Crop){return [] as MarketOption[]}
