/*
Input: String of SQL 
Output: Tree of nodes representing code with a select list item of values 
Rules
1. Parent node will be the keyword 
2. Child nodes are objects 

Algorithm
1. Create boolean node
2. Create integer node 
3. Create a Select Node 
4. Take string of SQL create the node structure 

Input: string of SQL
Output: 

Parser Rules
1. SQL statement strings bit-by-bit and then convert this into nodes
3.1 Each raw input starts with SELECT with a list of integers, booleans separated by a comma 
3.2 The first item in the list does not start with a comma 
3.3 Ending is represented by ; 
4. Removing spaces between any input strings 
5. If keyword is not found return a parsing error 

Edge cases
Data Structures: Class and methods/data to represented nodes 
Algorithm 
1. Remove all spaces
2. If select is not part of string return a parsing error 
3. Check if ';' is part of string if not - then expected error return 
2. Remove SELECT from string if SELECT is at start and is within the string 
3. Remove number separated with comma 
3. Create an array of comma separated string for select item list 
3.1 If length = 1 --> literal 
3.2 If length > 1 --> Select list 
4. 

Input SQL
Output: object
Rules 
1. Respond with null terminated JSON 
2. JSON has properties 'status' and values 'ok' if ran successfully, and error if not
3. If statement ran successfully 
3.1 If error 