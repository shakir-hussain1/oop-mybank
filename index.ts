#! /usr/bin/env node

import inquirer from "inquirer"

// This is interface of Bank Account
interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}

// This is class of Bank Account
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }
    
// This is Debit money
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
        console.log(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
    }else {
        console.log("Insufficient balance.");
    }
}

// This is Credit money
deposit(amount: number): void {
    if(amount > 100){
        amount -= 1; // $1 fee charged if more than $100 is deposited
    } this.balance += amount;
    console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
}

// This is Check balance
checkBalance(): void {
    console.log(`Current balance: $${this.balance}`);
}
}

// This is Customer class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account
    }
}

// Here bank accounts are created

const accounts: BankAccount[] = [
    new BankAccount (1111, 5000),
    new BankAccount (2222, 10000),
    new BankAccount (3333, 15000),
    new BankAccount (4444, 20000),
    new BankAccount (5555, 25000),
];

// Herer customers are created
const customers: Customer[] = [
    new Customer ("Shakir", "Hussain", "Male", 33, 3331234567, accounts[0]),
    new Customer ("Ali", "Jawwad", "Male", 22, 3341234567, accounts[1]),
    new Customer ("Okasha", "Aijaz", "Male", 27, 3351234567, accounts[2]),
    new Customer ("Osama", "Khan", "Male", 32, 3321234567, accounts[3]),
    new Customer ("Hamza", "Syed", "Male", 21, 3361234567, accounts[4])
]

// Here Functionality is defined

async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        })

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select an operation",
                choices: ["Desposit", "Withdraw", "Check Balance", "Exit"]
            }]);

            switch (ans.select) {
                case "Desposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    })
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                        const withdrawAmount = await inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdraw:"
                        })
                        customer.account.withdraw(withdrawAmount.amount);
                        break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
            }
            
        }else {
            console.log("Invalid account number. Please try again.");
        }
    } while(true)
}

service()