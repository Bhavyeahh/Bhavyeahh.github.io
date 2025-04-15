document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultsContainer = document.getElementById('results-container');
    const basicStats = document.getElementById('basic-stats');
    const pronounsStats = document.getElementById('pronouns-stats');
    const prepositionsStats = document.getElementById('prepositions-stats');
    const articlesStats = document.getElementById('articles-stats');
    
    const pronouns = [
        'i', 'you', 'he', 'she', 'it', 'we', 'they',
        'me', 'him', 'her', 'us', 'them', 'my', 'your', 
        'his', 'our', 'their', 'mine', 'yours', 'hers',
        'ours', 'theirs', 'myself', 'yourself', 'himself',
        'herself', 'itself', 'ourselves', 'themselves', 'this',
        'that', 'these', 'those', 'who', 'whom', 'whose',
        'which', 'what' , 'many'
    ];
    
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
    
    const indefiniteArticles = ['a', 'an'];
    
    analyzeBtn.addEventListener('click', function() {
        const text = textInput.value.trim();
        
        if (text) {
            resultsContainer.style.display = 'block';
            analyzeText(text);
        } else {
            alert('Please enter some text to analyze.');
        }
    });
    
    function analyzeText(text) {
        const stats = calculateBasicStats(text);
        displayBasicStats(stats);
        
        const words = text.toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .split(' ');
        
        const pronounCount = countOccurrences(words, pronouns);
        const prepositionCount = countOccurrences(words, prepositions);
        const articleCount = countOccurrences(words, indefiniteArticles);
        
        displayWordCounts(pronounCount, pronounsStats);
        displayWordCounts(prepositionCount, prepositionsStats);
        displayWordCounts(articleCount, articlesStats);
    }
    
    function calculateBasicStats(text) {
        const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
        const wordCount = text.trim().split(/\s+/).length;
        const spaceCount = (text.match(/ /g) || []).length;
        const newlineCount = (text.match(/\r?\n/g) || []).length;
        const specialSymbolCount = (text.match(/[^\w\s]/g) || []).length;
        return {
            letters: letterCount,
            words: wordCount,
            spaces: spaceCount,
            newlines: newlineCount,
            specialSymbols: specialSymbolCount
        };
    }
    
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
    
    function countOccurrences(words, wordList) {
        const counts = {};
        
        wordList.forEach(word => {
            counts[word] = 0;
        });
        
        words.forEach(word => {
            if (wordList.includes(word)) {
                counts[word] += 1;
            }
        });
        
        Object.keys(counts).forEach(key => {
            if (counts[key] === 0) delete counts[key];
        });
        
        return Object.fromEntries(
            Object.entries(counts).sort(([, a], [, b]) => b - a)
        );
    }
    
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
