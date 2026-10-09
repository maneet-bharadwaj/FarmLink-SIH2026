export type QualityGrade='Grade A'|'Grade B'|'Grade C';
export interface Crop{id:string;name:string;quantityKg:number;location:string;quality:QualityGrade;harvestDate:string;expectedSellingDate:string;storageAvailable:boolean;createdAt:number}
export interface MarketOption{id:string;name:string;type:'Market'|'Verified Buyer';pricePerKg:number;transportCost:number;storageCost:number;handlingCost:number;otherCost:number;distanceKm:number;location:string;pickupAvailable:boolean;verified:boolean}
export interface Buyer{id:string;name:string;requiredCrop:string;requiredQuantityKg:number;offeredPricePerKg:number;location:string;pickupAvailable:boolean;verified:boolean;rating:number}
export interface Offer{id:string;buyerId:string;buyerName:string;cropId:string;cropName:string;quantityKg:number;offeredPricePerKg:number;transportCost:number;storageCost:number;handlingCost:number;otherCost:number;status:'pending'|'accepted'|'declined';createdAt:number}
export type SaleStage='crop_listed'|'buyer_selected'|'pickup_scheduled'|'crop_delivered'|'payment_processing'|'payment_received';
export interface Sale{id:string;cropName:string;buyerName:string;quantityKg:number;netReturn:number;currentStage:SaleStage;stages:SaleStage[];createdAt:number}
export interface Grievance{id:string;subject:string;description:string;relatedSaleId?:string;status:'open'|'under_review'|'resolved';createdAt:number}
export interface PricePoint{date:string;price:number}
export interface MarketPrice{crop:string;market:string;currentPrice:number;previousPrice:number;unit:string;trend:'up'|'down'|'stable';trendHistory:PricePoint[]}
export interface FarmerProfile{name:string;location:string;farmSizeAcres:number;phone:string;memberSince:string}
export interface FpoLot{id:string;cropName:string;totalQuantityKg:number;farmerCount:number;location:string;askingPricePerKg:number;status:'open'|'matched'}
