const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');

const quotes = [
    {
        text: "That which does not kill us makes us stronger.",
        category: "Motivational"
    },
    {
      text: "Life is what happens when you're busy making other plans.",
      category: "Inspirational"                       
    },
    {
        text: "Be the change that you wish to see in the world.",
        category: "Resilience"
    },
    {
        text: "The purpose of our lives is to be happy.",
        category: "Inspirational"
    }
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${quote.text}" - ${quote.category}`;
}

newQuoteBtn.addEventListener('click', showRandomQuote);

// function createAddQuoteForm(){
//     const form = document.createElement('form');
//     form.id = 'addQuoteForm';

//     const textInput = document.createElement('input');
//     textInput.type = 'text';
//     textInput.placeholder = 'Enter quote text';
//     textInput.required = true;

//     const categoryInput = document.createElement('input');
//     categoryInput.type = 'text';
//     categoryInput.placeholder = 'Enter quote category';
//     categoryInput.required = true;

//     const submitBtn = document.createElement('button');
//     submitBtn.type = 'submit';
//     submitBtn.textContent = 'Add Quote';

//     form.appendChild(textInput);
//     form.appendChild(categoryInput);
//     form.appendChild(submitBtn);

//     form.addEventListener('submit', function(event) {
//         event.preventDefault();
//         const newQuote = {
//             text: textInput.value,
//             category: categoryInput.value
//         };
//         quotes.push(newQuote);
//         textInput.value = '';
//         categoryInput.value = '';
//         showRandomQuote();
//     });

//     document.body.appendChild(form);
// }

function addQuote(){
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
    if (newQuoteText && newQuoteCategory) {
        quotes.push({
            text: newQuoteText,
            category: newQuoteCategory
        });
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        // showRandomQuote();
        saveQuotes();
    }
}


function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}