//отделение внутреннего интерфейса от внешнего в ООП,ниже приведен пример на конструкторе создания кофемашин(ООП в функциональном стиле)

//конструктор для создания кофемашин
function coffeMachine(power, capacity) {
    //свойства записанные в this можно считать публичными
    this.waterAmount = 0;//количество воды в кофарке
    var WATER_HEAT_CAPACITY = 4200;//const потому что большими буквами
    var self = this;// переменная для получения self из замыкания,не менять!
    var timerId;//приватное свойство timerId,чтобы публичный метод stop имел доступ к этой переменной
    function getBoilTime() {
        return self.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
    }
    function onReady() {
        alert("Кофе готов!");
    }
    this.run = function() {
        timerId = setTimeout(onReady, getBoilTime());
    };//публичный метод потому что объявляен через this
    this.stop = function() {
        clearTimeout(timerId);
    };
    //сеттер. нужен для того, чтобы ограничить контроль над свойством со стороны внешнего кода
    this.SetWaterAmount = function(amount) {
        if(amount < 0) {
            throw new Error("Значение должно быть больше 0!")
        }
        if(amount > capacity) {
            throw new Error("Значение должно быть меньше" + capacity);
        }
        waterAmount = amount;
    };
    //геттер. нужен для того, чтобы получить значение свойства со стороны внешнего кода
    this.GetWaterAmount = function () {
        return waterAmount;
    };
    //единый геттер-сеттер
    this.GetterSetter = function (amount) {
        //вызов без аргументов - значит геттер
        if (!arguments.length) return waterAmount;
        //с параметрами - сеттер
        if (amount < 0) {
            throw new Error("Значение должно быть больше 0!")
        }
        if (amount > capacity) {
            throw new Error("Значение должно быть меньше" + capacity);
        }
        waterAmount = amount;
    };
    //геттер для приватного свойства power
    this.GetPower = function() {
        return power;
    };
    //публичный метод addWater
    this.addWater = function(amount) {
        if(amount + this.waterAmount > capacity)
            throw new Error("Слишком много воды!");
        if(amount + this.waterAmount <0) 
            throw new Error("Воды не может быть меньше 0!")
        this.waterAmount += amount;
    };
}


//еще один простой объект с сеттером и геттером
function User() {
    var firstName;
    var surname;
    var self = this;
    this.SetFirstName = function(name) {
        firstName = name;
    }
    this.SetSurName = function(familyname) {
        surname = familyname;
    }
    this.getFullName = function() {
        return firstName + " " + surname;
    }
}
