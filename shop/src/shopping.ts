type order=[string,string,number,number,number,boolean]
let orders: order[]=[["name","item",0,0,0,false]];
let max:number=0;

function add_order(name:string,item:string,qty:number,price:number,paid:boolean){
    //orders=[name,item,qty,price,qty*price,paid];
    orders.push([name,item,qty,price,qty*price,paid]);
    max++;
}

function disp_order(){
    let num:number;
    for (num=1;num<=max;num++) {
        console.log("\n\n\nCustomer: "+orders[num][0]);
        console.log("\nItem: "+orders[num][1]);
        console.log("\nQuantity: "+orders[num][2]);
        console.log("\nUnit Price: Rs."+orders[num][3]);
        console.log("\nTotal Amount: Rs."+orders[num][4]);
        console.log("\nPayment done: "+orders[num][5]);
    }
}

add_order("Rajesh","MackBook Pro",2,65000,true);
add_order("Kumar","zFlip Pro",3,85000,false);
add_order("Mathu","Windows 11 Pro",1,15000,true);
disp_order();
