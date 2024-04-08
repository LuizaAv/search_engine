1) Text search algorithm

    Main groups that user can search are users, shops, cars.

    The search engine shows results when you are searching by name, surename, email, shop name and address, car name.
    The search should be case-insensitive, which means it should treat uppercase and lowercase characters as equivalent.
    
    If there is a machine which has in the db of machines, but there isnt a user, who has this type of machine, the engine returns a message about that.

   
    Search algorithm based categorize can be not totally matching with 
    The search engine is showing results when users try to find users by email /both capital letter and little letter/
    When searching with car, there is returned the owners who have that model of car.

    Shops can be searched by name and by address. It will work despite being written with capital or little letter or even there are extra spaces in it.
    Also in case of shops, it must be written full name of a shop.
    When searching shops there will be shown the shop's details, but after clicking on the shop, there will
    be shown the details of owner of shop.

    Here the database of shopnames you can search for:  
    
    "levis",
    "lango",
    "leri",
    "blossom",
    "charles & keith",
    "parfois",
    "nike",

2) JSON structure

    JSON structure is contains 3 main groups and those groups' subgroups:

    1. User - 
        1. Posts
        2. Friends
    2. Shop -
        1. User
        2. Posts
        3. Followers
    3. Car - 
        1. Owners

3) Relations within JSON 

    Users can have shopId, cardId thus it will connect with shops and cars json db, also friends array, which elements are user 
    objects, post array, which are objects with post text and their ID-s.

    Shop can have userId, which will connect shop with a unique user, posts array, elements of which are objects with 

4) Implementation of search algorithm





Algorithm Requirements
1. Purpose
The purpose of this algorithm is to determine whether a given array of texts (comprising strings or numbers) contains a specific value, either as an exact match or as a substring, with a condition that the substring must occur at least a specified number of times consecutively within any text.

2. Inputs
texts: An array of strings or numbers representing the texts to search within.
value: A string or number to be searched for within the texts.
3. Outputs
boolean: true if the value is found either as an exact match or as a substring with a minimum number of consecutive occurrences; otherwise, false.
4. Algorithm Details
The algorithm consists of two main functions:

a. Text
typescript
Copy code
Text(texts: (string | number)[], value: string | number): boolean
Purpose: Determines whether the value is present in the texts.
Input Parameters:
texts: An array of strings or numbers representing the texts to search within.
value: A string or number to be searched for within the texts.
Return Type: boolean
Behavior:
Converts value to lowercase and trims whitespace if it's a string.
Iterates through each element of texts to check if value is present as an exact match or substring.
Utilizes the include function to perform the inclusion check.
b. include
typescript
Copy code
include(text: string, subtext: string): boolean
Purpose: Checks if a given subtext is included in the text with a minimum number of consecutive occurrences.
Input Parameters:
text: The text to be searched within.
subtext: The substring to search for within text.
Return Type: boolean
Behavior:
Sets check to determine the minimum number of consecutive occurrences required.
Iterates through text to find consecutive occurrences of subtext.
Returns true if subtext is found with at least check consecutive occurrences; otherwise, returns false.
5. Implementation Notes
Ensure proper handling of edge cases, such as empty arrays, empty strings, or invalid inputs.
Consider performance optimizations if dealing with large arrays or texts.
6. Example Usage
typescript
Copy code
const texts: (string | number)[] = ["apple", "banana", "orange"];
const value: string = "an";
const result: boolean = Text(texts, value);
console.log(result); // Output: true
7. Assumptions
The comparison is case-insensitive.
If value is a string, it's trimmed of leading and trailing whitespace.
Consecutive occurrences of subtext are required to be contiguous without any interruptions.




