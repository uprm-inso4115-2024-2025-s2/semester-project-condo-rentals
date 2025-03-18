export default class Condo {
    private price: number;
    private owner: string;
    private area: number;
  
    /**
     * Constructor to initialize a Condo object.
     * @param price - The price of the condo.
     * @param owner - The owner of the condo.
     * @param area - The area of the condo in square feet.
     */
    constructor(price: number, owner: string, area: number) {
      this.price = price;
      this.owner = owner;
      this.area = area;
    }
  
    /**
     * Gets the price of the condo.
     */
    getPrice(): number {
      return this.price;
    }
  
    /**
     * Gets the owner of the condo.
     */
    getOwner(): string {
      return this.owner;
    }
  
    /**
     * Gets the area of the condo.
     */
    getArea(): number {
      return this.area;
    }
  }