type ticket = [string,string,string,number,string];
let trips:string[] = ["TRP123A","TRP332C","TRP225V"];
let booked:number[] = [0,0,0];
let max:number = 40;
let tickets: ticket[]=[["ticket_id","trip_code","fullname",0,"status"]];

function book_ticket(new_ticket:ticket){
tickets.push(new_ticket);
switch(new_ticket[1]){
    case trips[0]:
        booked[0]++;
        break;
    case trips[1]:
        booked[1]++;
        break;
    case trips[2]:
        booked[2]++;
        break;
}
}

function booking_history(){
    console.log("\n\nBooking History:");
    console.log(tickets);
}

function cancel_ticket(ticket_id:string){
    let i:number;
    for(i = 1; i < tickets.length; i++){
        if(tickets[i][0] == ticket_id){
            tickets[i][4] = "cancelled";
            switch(tickets[i][1]){
                case trips[0]:
                    booked[0]--;
                    break;
                case trips[1]:
                    booked[1]--;
                    break;
                case trips[2]:
                    booked[2]--;
                    break;
            }
        }
    }
    console.log("\nTicket "+ticket_id+" has been cancelled");
}

function availability(){
    let i:number;
    console.log("\nTotal no.of available seats:")
    for(i = 0; i < booked.length; i++) {
        console.log(trips[i]+": "+(max-booked[i]));
    }
}

function display_tickets(trip_id:string){
    let i:number;
    let tick_count:number=0;
    console.log("\n\nTickets List for "+trip_id+":");
    for(i = 1; i < tickets.length; i++){
        if(tickets[i][4] == "booked" && tickets[i][1] == trip_id){
            console.log("\nTicket ID: "+tickets[i][0]);
            console.log("Trip ID: "+tickets[i][1]);
            console.log("Passenger Name: "+tickets[i][2]);
            console.log("Fare: "+tickets[i][3]);
            tick_count++;
        }
    }
    if(tick_count == 0)
        console.log("No tickets booked");
}

availability();
display_tickets("TRP123A");
display_tickets("TRP332C");
display_tickets("TRP225V");
book_ticket(["tick_001x4","TRP123A","Manoj",455,"booked"]);
book_ticket(["tick_001x3","TRP123A","Kumar",455,"booked"]);
book_ticket(["tick_002x4","TRP332C","Rani",545,"booked"]);
book_ticket(["tick_021x4","TRP332C","Mona",455,"booked"]);
book_ticket(["tick_002x8","TRP225V","Ramu",605,"booked"]);
book_ticket(["tick_021x7","TRP123A","Arjun",455,"booked"]);
availability();
display_tickets("TRP123A");
display_tickets("TRP332C");
display_tickets("TRP225V");
cancel_ticket("tick_001x4");
cancel_ticket("tick_021x4");
availability();
display_tickets("TRP123A");
display_tickets("TRP332C");
display_tickets("TRP225V");
booking_history()
