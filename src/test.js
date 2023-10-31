const userArray = [
{
    firstName: 'Sam',
    lastName: 'Jackson',
    age: 15,
    occupation: 'student' 
},
{
    firstName: 'Troy',
    lastName: 'Marble',
    age: 25,
    occupation: 'waiter' 
},
{
    firstName: 'Jon',
    lastName: 'Hewiet',
    age: 54,
    occupation: 'hairdresser' 
},
{
    firstName: 'Don',
    lastName: 'Vale',
    age: 134,
    occupation: 'plumber' 
},
{
    firstName: 'Erin',
    lastName: 'Harget',
    age: 14,
    occupation: 'student' 
},

]

//Map, reduce, sort, some, every

const userClone = newClone => { 
    
    return newClone.map((value,index,array) => {
        return [value.firstName, value.lastName].join(' ')
    })
    //return newClone
}

const sortUsers = userArray => { 
    
    const test = userArray.sort((a,b) => {
        if(a.age > b.age) return 1
        else if(a.age < b.age) return -1

        return 0
    })

    console.log(test.reverse())
    //return newClone
}

sortUsers(userArray)


const totalAverageAge = userArray => { 
    let totalAge = 0,
        averageAge = 0;
    let name = ''

    return totalSum = userArray.reduce((newArray, currentValue, index) => {
        index < userArray.length - 1 ?
        (name = name + `${currentValue.firstName} ${currentValue.lastName}, `) :
        (name = name + `and ${currentValue.firstName} ${currentValue.lastName}`)
        totalAge = totalAge + currentValue.age
        if(index === userArray.length - 1){
            averageAge = Math.round(totalAge / userArray.length)
        }
        return `The total age of "${name}" is ${averageAge}`
    }, '')
}
console.log(totalAverageAge(userArray))

const findUser = (userName, userArray) => {
    const name = userName.split(' ')

    return userFound = userArray.find((user) =>{
        if(name[0] === user.firstName && name[1] === user.lastName)
        return user
    })
}

const createUser = (userName, userArray) => {
    const name = userName.split(' ')
    const newUser = {}

    newUser.firstName = name[0]
    newUser.lastName = name[1]
    newUser.age = ''
    newUser.occupation = ''

    userArray.push(newUser)
}
 
const main = () => {
    const newUserName = 'Jons Hewiet'
    let userFound = false

    return findUser(newUserName, userArray) ? "User found!" : createUser(newUserName, userArray)

}

const userArray2 = userClone(userArray)
for(let key in userArray2){
    //console.log(userArray2[key])
}


