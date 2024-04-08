1) JSON structure

    JSON structure is contains 3 main groups and those groups' subgroups:

    1. User - 
        1. id  
        2. name
        3. surename
        4. age
        5. email
        6. carId
        7. shopId
        8. posts
        9. friends
    2. Shop -
        1. name
        2. shopId
        3. userId
        4. address
        5. posts
        6. followers
    3. Car - 
        1. type of machine

    

2) Relations within JSON 

    Users can have shopId, cardId thus it will connect with shops and cars json db, also friends array, which elements are user 
    objects, post array, which are objects with post text and their ID-s.

    Shop can have userId, which will connect shop with a unique user, posts array, elements of which are array, with posts done by 
    shop, and followers, which is the array of userId, througth which it connect with the users json.  

3) Implementation of search algorithm

    Algorithm implementation is so that user can search shops by shop name and address, cars by car name within the initial 
    range of cars and shops which are brougth bellow. 
    Also user can search users by their name, surename, email. 

    If he/she input an email, it must match to the requirements of email. It must contain this symbols
    [alphanumeric character plus underscore, -, . , +, @, a-z, A-Z, numbers, $]
    
    The comparison is case-insensitive. User can type both upper and lower case.

    Name and surename can be not completely written. Even in case of one letter, there is shown all users, which contain 
    that letter. More than equal 2 letters there is checked names consecutive occurrences.

        Shop from this range
            shop name

        "levis",
        "mango",
        "stradivarius",
        "blossom",
        "charles & keith",
        "parfois",
        "nike"

            shop addresses

        "abovyan 45",
        "yerevan mall",
        "erebuni mall",
        "abovyan 35",
        "dalma garden mall"
    
            cars can be searched from this range

            "acura",
            "alfa romeo",
            "audi",
            "bmw",
            "bentley",
            "buick",
            "cadillac",
            "chevrolet",
            "chrysler",
            "dodge",
            "ferrari",
            "fiat",
            "ford",
            "gmc",
            "honda",
            "hyundai",
            "infiniti",
            "jaguar",
            "jeep",
            "kia",
            "lamborghini",
            "land rover",
            "lexus",
            "lincoln",
            "maserati",
            "mazda",
            "mercedes-benz",
            "mini",
            "mitsubishi",
            "nissan",
            "porsche",
            "ram",
            "subaru",
            "tesla",
            "toyota",
            "volkswagen",
            "volvo"

        users emails

            "emma.voskanyan@gmail.com"
            "m.avet7777@gmail.com"
            "sona.gasparyan@gmail.com"
            "l.avetisyan7777@gmail.com"
            "karen.gasparyan@gmail.com"
            "lusine.mnatsakanyan@gmail.com"
            "hovhannes.mkrtchyan@gmail.com"

        users name-surenames

            "Emma Voskanyan"
            "Meri Avetisyan"
            "Sona Gasparyan"
            "Luiza Avetisyan"
            "Karen Gasparyan"
            "Lusine Mnatsakanyan"
            "Hovhannes Mkrtchyan"
        
        


4) Text search algorithm

    Algorithm Requirements

    1. Purpose

    The purpose of this algorithm is to determine whether a given array of texts (comprising strings or numbers) contains a 
    specific value, either as an exact match or as a substring, with a condition that the substring must occur at least a 
    specified number of times consecutively within any text.

    2. Inputs

    texts: An array of strings or numbers representing the texts to search within.
    value: A string or number to be searched for within the texts.

    3. Outputs

    boolean: true if the value is found either as an exact match or as a substring with a minimum number of consecutive 
    occurrences; otherwise, false.

    MAIN FUNCTIONALITIES OF ALGORITHM 

    function includesText()

    Determines whether the value is present in the texts.
    Converts value to lowercase and trims whitespace if it's a string.
    Iterates through each element of texts to check if value is present as an exact match or substring.
    Use include function to check the inclusion.
    Return boolean value

    function include()

    Checks if a given subtext is included in the text with a minimum number of consecutive occurrences.
    Create boolean flag to determine the minimum number of consecutive occurrences required.
    Return boolean value
    Iterates through text to find consecutive occurrences of subtext.
    Returns true if subtext is found with at least check consecutive occurrences; otherwise, returns false.

    The comparison is case-insensitive.



