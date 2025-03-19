import Condo from '../components/Condo';

const mockCondo = new Condo(250000, "Ednita Nasario", 1200);

console.log(mockCondo.getPrice()); // 250000
console.log(mockCondo.getOwner()); // Ednita Nasario
console.log(mockCondo.getArea());  // 1200
