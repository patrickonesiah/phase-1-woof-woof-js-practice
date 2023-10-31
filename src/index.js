const url = 'http://localhost:3000/pups'

const isFilterOnOFF = (puppyArray) => {
    let filterStatus = false;

    document.querySelector('#good-dog-filter').addEventListener('click', (e) => {
        const arrayOfSplitWords = e.target.innerHTML.split(' ')

        if (arrayOfSplitWords[3] === 'OFF') {
            e.target.innerHTML = 'Filter good dogs: ON'
            filterStatus = true
        } else {
            e.target.innerHTML = 'Filter good dogs: OFF'
            filterStatus = false
        }
        displayAllDogs(puppyArray, filterStatus)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    fetch(url)
        .then(function (resp) {
            return resp.json()
        }).then(function (puppyArray) {
            isFilterOnOFF(puppyArray)
            displayAllDogs(puppyArray)
        })
});

const displayAllDogs = (puppyArray, isFilterOnOff = false) => {

    const dogBar = document.querySelector('#dog-bar')

    const goodDogsArray = puppyArray.filter((puppy) => {
        if (puppy.isGoodDog) return puppy
    })

    dogBar.innerHTML = ''

    if (isFilterOnOff) {
        displayPupDetails(goodDogsArray,0)
        for (let j in goodDogsArray) {
            const dogButton = document.createElement('span')
            dogButton.innerHTML = goodDogsArray[j].name
            dogButton.addEventListener('click', (event) => {
                displayPupDetails(goodDogsArray,j)
            })
            dogBar.appendChild(dogButton)
        }
    } else {
        displayPupDetails(puppyArray,0)
        for (let i in puppyArray) {
            const dogButton = document.createElement('span')
            dogButton.innerHTML = puppyArray[i].name
            dogButton.addEventListener('click', (event) => {
                displayPupDetails(puppyArray,i)
            })
            dogBar.appendChild(dogButton)
        }
    }
}

const displayPupDetails = (puppyArray,dogID) => {
    const isGoodDog = puppyArray[dogID].isGoodDog
    const dogInfo = document.querySelector('#dog-info')
    const a = document.createElement('h2'),
        b = document.createElement('img'),
        c = document.createElement('button')

    dogInfo.innerHTML = ''
    a.innerHTML = puppyArray[dogID].name
    b.src = puppyArray[dogID].image
    b.style.width = '300px'
    c.id = 'goodBadButton'
    isGoodDog ? (c.innerHTML = 'Good Dog!') : (c.innerHTML = 'Bad Dog!')

    dogInfo.appendChild(b)
    dogInfo.appendChild(a)
    dogInfo.appendChild(c)

    c.addEventListener('click',()=>{
        puppyArray[dogID].isGoodDog ? (puppyArray[dogID].isGoodDog = false) : (puppyArray[dogID].isGoodDog = true)   
        updateText(puppyArray[dogID])
        puppyArray[dogID].isGoodDog ? (c.innerHTML = 'Good Dog!') : (c.innerHTML = 'Bad Dog!')                    
    })
}

const updateText = puppy => {

    fetch(url + "/" + puppy.id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(puppy)
    })
}


