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

    // Function to add a new quote without using createElement or appendChild
    window.CreateAddQuoteForm = function() {
        const newQuoteText = document.getElementById('newQuoteText').value.trim();
        const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
        if (newQuoteText && newQuoteCategory) {
            quotes.push({ text: newQuoteText, category: newQuoteCategory });
            alert("Quote added successfully!");

            // Update the dropdown categories if a new category is introduced
            if (!Array.from(categoryFilter.options).some(option => option.value === newQuoteCategory)) {
                const newOption = new Option(newQuoteCategory, newQuoteCategory);
                categoryFilter.add(newOption);
            }

            // Save the updated quotes to local storage
            localStorage.setItem('quotes', JSON.stringify(quotes));
        } else {
            alert("Please enter both a quote and a category.");
        }
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