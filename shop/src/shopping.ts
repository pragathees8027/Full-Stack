// tuple for saving customer's name,item_name,quantity,unit_price, paid/not
//type orders=[string,string,number,number,number,boolean];
let orders:[string,string,number,number,number,boolean]=["name","item",0,0,0,false];
let count:number=0;
function add_order(name:string,item:string,qty:number,price:number,paid:boolean){
    //orders=[name,item,qty,price,qty*price,paid];
    orders.push(name,item,qty,price,qty*price,paid);
    count++;
}

function disp_order(){
    let num:number=-1;
    for (num=1;num<=count*6;num++) {
        console.log("\n\n\nCustomer: "+orders[++num]);
        console.log("\nItem: "+orders[++num]);
        console.log("\nQuantity: "+orders[++num]);
        console.log("\nUnit Price: Rs."+orders[++num]);
        console.log("\nTotal Amount: Rs."+orders[++num]);
        console.log("\nPayment done: "+orders[++num]);
    }
}

/*function cancel_order(){
    
}*/

add_order("Rajesh","MackBook Pro",2,65000,true);
add_order("Kumar","zFlip Pro",3,85000,false);
add_order("Mathu","Windows 11 Pro",1,15000,true);
disp_order();
