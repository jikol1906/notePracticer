
        const notes = document.getElementById("notes");
        const noteSlider = document.getElementById("range");
        const button = document.getElementById("button");
        const checkbox = document.getElementById("add-accidentals");



        let numOfNotes = 2;
        let addAccidentals = false;
        let changingNotes = false;
        checkbox.checked = false;
        noteSlider.value = numOfNotes;

        noteSlider.oninput = changeNumOfNotes;
        button.onclick = newNotes;
        notes.onanimationstart = () => animationStarted;
        notes.onanimationend = () => animationEnded;
        checkbox.onchange = () => addAccidentals = !addAccidentals;
        document.onkeydown = handleDocumentKeyDown;

        function handleDocumentKeyDown(e) {
            if (e.keyCode === 13) {
                button.click();
            }
        }


        function animationStarted(e) {
            changingNotes = true;
        }

        function animationEnded(e) {
            changingNotes = false;
        }

        function changeNumOfNotes(e) {
            numOfNotes = e.target.value;
            newNotes();
        }

        function newNotes() {
            notes.textContent = getRandomNotes(numOfNotes).join(' ');
        }

        function getRandomNotes(numOfNotes) {

            let notes = shuffle(getNaturalNotes()).slice(0, numOfNotes);

            if (addAccidentals) {

                notes = notes.map(n => {
                    if (getRandomBoolean()) {
                        if ('DGA'.includes(n)) { return n + (getRandomBoolean() ? '♭' : '♯') }
                        if ('EB'.includes(n)) { return n + '♭' }
                        return n + '♯'
                    }
                    return n;
                })
            }

            return notes;
        }

        function getRandomBoolean() {
            return Math.random() >= 0.5;
        }

        function getNaturalNotes() {
            return 'ABCDEFG'.split('');
        }

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        notes.textContent = getRandomNotes(numOfNotes).join(' ');
