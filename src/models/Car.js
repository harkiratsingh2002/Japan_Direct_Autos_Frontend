
// class Car {
    
//     constructor (id,name,type,year,price,brand) {
//         this.id  = id;
//         this.name = name
//         this.type = type,
//         this.year = year,
//         this.price = price,
//         this.brand = brand,

//     }

//     // addImagesToCar(...rest) {
//     //     this.images = rest
//     // }

// };

function Car (id,name,carType,year,price,brand){

    let car = {
        id,
        name,
        carType,
        year,
        price,
        brand,
        images: [],
        specification: {
            engine: '',
            suspension: '',
            transmission: '',
            fuelType: '',
            mileage: '',
            seatingCapacity: '',
            color:''

        },
        variants: {}
    }

    

    return car
}

export default Car;