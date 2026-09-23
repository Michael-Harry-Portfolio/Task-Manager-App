const messages = [" It's you vs you" , " Stick to the plan" , " There are two kinds of people in this world, sayers and doers. Which one are you?" , " You are your only limit" , " Don't stop until you're proud" , " The harder you work for something, the greater you'll feel when you achieve it" , " Dream it. Wish it. Do it." , " Great things never come from comfort zones" , " Push yourself, because no one else is going to do it for you" , " Success doesn't just find you. You have to go out and get it." , " The harder you work for something, the greater you'll feel when you achieve it." , " Don't watch the clock; do what it does. Keep going." , " Little things make big days." , " It's going to be hard, but hard does not mean impossible." , " Don't wait for opportunity. Create it." , " Sometimes we're tested not to show our weaknesses, but to discover our strengths." , " The key to success is to focus on goals, not obstacles." , " Dream bigger. Do bigger." , " Don't stop when you're tired. Stop when you're done." , " Wake up with determination. Go to bed with satisfaction." ];


function getRandomNumber (){
    return Math.floor(Math.random() * messages.length);
}

function getMessage(){
    const randomNumber = getRandomNumber();
    return messages[randomNumber];
}
return getMessage();