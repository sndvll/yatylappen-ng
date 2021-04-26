

const myProgram = () => {
  // Detta bara för att simulera listorna i uppgiften
  const words = [];
  const tempList = [];

  // loop 1 jadajada

  //Här är loop nr 2
  for (let i = 0; i < 8; i++) {

    // Se kommentarar om vad som händer här i funktionen getUniqueWordIndex
    const uniqueIndex = getUniqueWordIndex(words, tempList);
    // Nu har vi det unika indexet, så plocka ut det ordet och pusha in i words-listan
    words.push(tempList(uniqueIndex));
    // samt ta bort det ordet ur templist så det inte väljs igen.
    tempList.splice(uniqueIndex, 1);
  }
}

function getUniqueWordIndex(words, tempList) {
  // Ta först ut ett random index för att välja ett ord
  const randomWordIndex = Math.floor(tempList.length * Math.random());
  // för läsbarhet, spara ner själva ordet i en variabel
  const randomWord = tempList[randomWordIndex];
  // Om listan words redan innehåller det ordet
  if (words.includes(randomWord)) {
    // gör en så kallad "recursion", en funktion som anropar sig själv för att välja ut ett nytt ord
    // När vi väl har ett unikt ord kommer det att returneras här
    return getUniqueWordIndex(words,tempList);
  }

  // Här hamnar vi när vi väl har ett unikt ord, men returnerar då indexet.
  return randomWordIndex;
}
