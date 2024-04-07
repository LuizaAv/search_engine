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
