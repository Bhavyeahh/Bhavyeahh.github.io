document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const textInput = document.getElementById('text-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultsContainer = document.getElementById('results-container');
    const basicStats = document.getElementById('basic-stats');
    const pronounsStats = document.getElementById('pronouns-stats');
    const prepositionsStats = document.getElementById('prepositions-stats');
    const articlesStats = document.getElementById('articles-stats');
    
    // List of pronouns to check
    const pronouns = [
        'i', 'you', 'he', 'she', 'it', 'we', 'they',
        'me', 'him', 'her', 'us', 'them', 'my', 'your', 
        'his', 'our', 'their', 'mine', 'yours', 'hers',
        'ours', 'theirs', 'myself', 'yourself', 'himself',
        'herself', 'itself', 'ourselves', 'themselves', 'this',
        'that', 'these', 'those', 'who', 'whom', 'whose',
        'which', 'what'
    ];
    
    // List of prepositions to check
    const prepositions = [
        'about', 'above', 'across', 'after', 'against', 'along', 
        'amid', 'among', 'around', 'at', 'before', 'behind', 
        'below', 'beneath', 'beside', 'besides', 'between', 
        'beyond', 'by', 'down', 'during', 'except', 'for', 
        'from', 'in', 'inside', 'into', 'like', 'near', 'of', 
        'off', 'on', 'onto', 'out', 'outside', 'over', 'past', 
        'since', 'through', 'throughout', 'to', 'toward', 
        'towards', 'under', 'underneath', 'until', 'unto', 
        'up', 'upon', 'with', 'within', 'without'
    ];
    
    // List of indefinite articles
    const indefiniteArticles = ['a', 'an'];
    
    // Add event listener to the analyze button
    analyzeBtn.addEventListener('click', function() {
        const text = textInput.value.trim();
        
        if (text) {
            // Show results container
            resultsContainer.style.display = 'block';
            
            // Perform analysis
            analyzeText(text);
        } else {
            alert('Please enter some text to analyze.');
        }
    });
    
    // Function to analyze text
    function analyzeText(text) {
        // Calculate basic statistics
        const stats = calculateBasicStats(text);
        displayBasicStats(stats);
        
        // Tokenize text (convert to lowercase and split by spaces and punctuation)
        const words = text.toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .split(' ');
        
        // Count pronouns, prepositions, and indefinite articles
        const pronounCount = countOccurrences(words, pronouns);
        const prepositionCount = countOccurrences(words, prepositions);
        const articleCount = countOccurrences(words, indefiniteArticles);
        
        // Display results
        displayWordCounts(pronounCount, pronounsStats);
        displayWordCounts(prepositionCount, prepositionsStats);
        displayWordCounts(articleCount, articlesStats);
    }
    
    // Function to calculate basic text statistics
    function calculateBasicStats(text) {
        const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
        const wordCount = text.trim().split(/\s+/).length;
        const spaceCount = (text.match(/\s/g) || []).length;
        const newlineCount = (text.match(/\n/g) || []).length;
        const specialSymbolCount = (text.match(/[^\w\s]/g) || []).length;
        
        return {
            letters: letterCount,
            words: wordCount,
            spaces: spaceCount,
            newlines: newlineCount,
            specialSymbols: specialSymbolCount
        };
    }
    
    // Function to display basic text statistics
    function displayBasicStats(stats) {
        basicStats.innerHTML = `
            <table>
                <tr>
                    <th>Element</th>
                    <th>Count</th>
                </tr>
                <tr>
                    <td>Letters</td>
                    <td>${stats.letters}</td>
                </tr>
                <tr>
                    <td>Words</td>
                    <td>${stats.words}</td>
                </tr>
                <tr>
                    <td>Spaces</td>
                    <td>${stats.spaces}</td>
                </tr>
                <tr>
                    <td>Newlines</td>
                    <td>${stats.newlines}</td>
                </tr>
                <tr>
                    <td>Special Symbols</td>
                    <td>${stats.specialSymbols}</td>
                </tr>
            </table>
        `;
    }
    
    // Function to count occurrences of words from a specific list
    function countOccurrences(words, wordList) {
        const counts = {};
        
        // Initialize counts object with zeros for all words in the list
        wordList.forEach(word => {
            counts[word] = 0;
        });
        
        // Count occurrences
        words.forEach(word => {
            if (wordList.includes(word)) {
                counts[word] += 1;
            }
        });
        
        // Remove words with zero occurrences
        Object.keys(counts).forEach(key => {
            if (counts[key] === 0) delete counts[key];
        });
        
        // Sort by count in descending order
        return Object.fromEntries(
            Object.entries(counts).sort(([, a], [, b]) => b - a)
        );
    }
    
    // Function to display word counts in a table
    function displayWordCounts(countObj, container) {
        const entries = Object.entries(countObj);
        
        if (entries.length === 0) {
            container.innerHTML = '<p>No matches found.</p>';
            return;
        }
        
        let html = `
            <table>
                <tr>
                    <th>Word</th>
                    <th>Count</th>
                </tr>
        `;
        
        entries.forEach(([word, count]) => {
            html += `
                <tr>
                    <td>${word}</td>
                    <td>${count}</td>
                </tr>
            `;
        });
        
        html += '</table>';
        container.innerHTML = html;
    }
});
