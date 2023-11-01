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

    dogBar.innerHTML = ''

    if (isFilterOnOff) {
        const goodDogsArray = puppyArray.filter((puppy) => {
            if (puppy.isGoodDog) return puppy
        })

        //Need to fix
        displayPupDetails(goodDogsArray[0])
        for (let j in goodDogsArray) {
            const dogButton = document.createElement('span')
            dogButton.innerHTML = goodDogsArray[j].name
            dogButton.addEventListener('click', (event) => {
                displayPupDetails(goodDogsArray[j])
            })
            dogBar.appendChild(dogButton)
        }
    } else {
        displayPupDetails(puppyArray[0])
        for (let i in puppyArray) {
            const dogButton = document.createElement('span')
            dogButton.innerHTML = puppyArray[i].name
            dogButton.addEventListener('click', (event) => {
                displayPupDetails(puppyArray[i])
            })
            dogBar.appendChild(dogButton)
        }
    }
}

const displayPupDetails = (dog) => {
    const isGoodDog = dog.isGoodDog
    const dogInfo = document.querySelector('#dog-info')
    const dogName = document.createElement('h2'),
            dogImage = document.createElement('img'),
        goodBadButton = document.createElement('button')

    dogInfo.innerHTML = ''
    dogName.innerHTML = dog.name
    dogImage.src = dog.image
    dogImage.style.width = '300px'
    goodBadButton.id = 'goodBadButton'
    // c.dataset.idName = dog.id
    // console.log(c.dataset)
    isGoodDog ? (c.innerHTML = 'Good Dog!') : (c.innerHTML = 'Bad Dog!')

    dogInfo.appendChild(dogImage)
    dogInfo.appendChild(dogName)
    dogInfo.appendChild(c)

    c.addEventListener('click',()=>{
        dog.isGoodDog ? (dog.isGoodDog = false) : (dog.isGoodDog = true)   
        updateText(dog)
        dog.isGoodDog ? (c.innerHTML = 'Good Dog!') : (c.innerHTML = 'Bad Dog!')                    
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


