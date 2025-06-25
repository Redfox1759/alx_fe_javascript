document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const categoryFilter = document.getElementById('categoryFilter');
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
    let selectedCategory = localStorage.getItem('filteredCategory') || 'all';

    // Function to display a random quote using innerHTML
    function showRandomQuote() {
        const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === filteredCategory);
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];
        quoteDisplay.innerHTML = `"${randomQuote.text}" - <strong>${randomQuote.category}</strong>`;
    }

    // Event listener for showing a new quote
    newQuoteButton.addEventListener('click', showRandomQuote);

function createAddQuoteForm(){
    const form = document.createElement('form');
    form.id = 'addQuoteForm';

    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.placeholder = 'Enter quote text';
    textInput.required = true;

    const categoryInput = document.createElement('input');
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';
    categoryInput.required = true;

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Add Quote';

    form.appendChild(textInput);
    form.appendChild(categoryInput);
    form.appendChild(submitBtn);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const newQuote = {
            text: textInput.value,
            category: categoryInput.value
        };
        quotes.push(newQuote);
        textInput.value = '';   
        categoryInput.value = '';
        showRandomQuote();
    });

    document.body.appendChild(form);
}   
    // Function to populate categories dynamically
    function populateCategories() {
        const categories = [...new Set(quotes.map(quote => quote.category))];
        categories.forEach(category => {
            const option = new Option(category, category);
            categoryFilter.add(option);
        });
        categoryFilter.value = selectedCategory || 'all';
    }

    // Function to filter quotes based on selected category
    window.filterQuotes = function() {
        selectedCategory = categoryFilter.value;
        localStorage.setItem('filteredCategory', selectedCategory);
        showRandomQuote();
    }

    // Load saved quotes from local storage
    const savedQuotes = JSON.parse(localStorage.getItem('quotes'));
    if (savedQuotes) {
        quotes.push(...savedQuotes);
    }

    // Populate categories and show the initial random quote
    populateCategories();
    showRandomQuote();
});
