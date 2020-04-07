const boardTemplates = [
    {
        name: 'hello world',
        squaresTypes: [4,4,4,4,4,4,4,0,0,0,4,0,0,0,0,0,0,4,0,0,0,4,4,4,4,4,4,4,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,4,0,0,4,4,0,0,4,0,0,4,4,0,0,4,0,0,4,0,0,0,0,0,0,0,4,4,4,4,4,4,4,0,0,0,0,0,0,4,0,0,0,0,0,0,4,0,0,0,0,0,0,4,0,0,0,0,0,0,0,4,4,4,4,4,4,4,0,0,0,0,0,0,4,0,0,0,0,0,0,4,0,0,0,0,0,0,4,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,4,4,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,4,4,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,4,4,0,0,4,0,0,4,0,4,0,4,4,4,4,0,0,4,0,0,0,0,0,0,0,4,4,4,4,4,4,4,0,0,0,0,0,0,4,0,0,0,0,0,0,4,0,0,0,0,0,0,4,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,4,4,0,0,0,0,0,4,0,4,4,4,4,4,0,0,0,0,0,0,0,0]
    },
    {
        name: 'hearts',
        squaresTypes: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,4,1,1,1,4,0,0,4,1,1,1,1,4,0,0,4,1,1,1,1,4,4,1,1,1,1,4,0,4,1,1,1,4,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,4,2,2,2,4,0,0,4,2,2,2,2,4,0,0,4,2,2,2,2,4,4,2,2,2,2,4,0,4,2,2,2,4,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,4,3,3,3,4,0,0,4,3,3,3,3,4,0,0,4,3,3,3,3,4,4,3,3,3,3,4,0,4,3,3,3,4,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,4,2,2,2,4,0,0,4,2,2,2,2,4,0,0,4,2,2,2,2,4,4,2,2,2,2,4,0,4,2,2,2,4,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,4,1,1,1,4,0,0,4,1,1,1,1,4,0,0,4,1,1,1,1,4,4,1,1,1,1,4,0,4,1,1,1,4,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,4,2,2,2,4,0,0,4,2,2,2,2,4,0,0,4,2,2,2,2,4,4,2,2,2,2,4,0,4,2,2,2,4,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    {
        name: 'creeper',
        squaresTypes: [4,4,4,4,4,4,0,2,2,2,2,2,2,4,2,2,2,2,2,2,2,2,4,4,2,2,2,2,2,4,4,2,4,4,2,2,2,2,4,4,2,2,2,2,2,4,4,2,2,2,4,4,2,4,4,2,2,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,0,2,2,2,2,2,2,4,2,2,2,2,2,2,2,2,4,4,2,2,2,2,2,4,4,2,4,4,2,2,2,2,4,4,2,2,2,2,2,4,4,2,2,2,4,4,2,4,4,2,2,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,0,2,2,2,2,2,2,4,2,2,2,2,2,2,2,2,4,4,2,2,2,2,2,4,4,2,4,4,2,2,2,2,4,4,2,2,2,2,2,4,4,2,2,2,4,4,2,4,4,2,2,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    {
        name: 'send nudes',
        squaresTypes: [0,0,0,0,0,0,0,0,4,4,0,0,4,0,4,0,0,4,0,0,4,4,0,0,4,0,0,4,4,0,0,4,0,0,4,0,4,0,0,4,4,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,4,0,0,4,4,0,0,4,0,0,4,4,0,0,4,0,0,4,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,4,4,0,0,0,0,0,4,4,0,0,0,0,0,4,0,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,4,4,4,4,4,4,4,0,0,0,0,0,0,4,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,4,4,0,0,0,0,0,4,4,0,0,0,0,0,4,0,4,4,4,4,4,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,4,0,0,4,4,0,0,4,0,0,4,4,0,0,4,0,0,4,0,0,0,0,0,0,0,0,4,4,0,0,4,0,4,0,0,4,0,0,4,4,0,0,4,0,0,4,4,0,0,4,0,0,4,0,4,0,0,4,4,0]
    },
    {
        name: 'pattern 1',
        squaresTypes: [3,3,4,4,4,3,3,2,3,3,4,3,3,2,2,2,3,3,3,2,2,1,2,2,3,2,2,1,1,1,2,2,2,1,1,2,1,1,2,1,1,2,2,2,1,1,1,2,2,3,2,2,1,2,2,3,3,3,2,2,2,3,3,4,3,3,2,3,3,4,4,4,3,3,3,4,4,3,4,4,3,4,4,3,3,3,4,4,4,3,3,2,3,3,4,3,3,2,2,2,3,3,3,2,2,1,2,2,3,2,2,1,1,1,2,2,2,1,1,2,1,1,2,1,1,2,2,2,1,1,1,2,2,3,2,2,1,2,2,3,3,3,2,2,2,3,3,4,3,3,2,3,3,4,4,4,3,3,3,4,4,3,4,4,3,4,4,3,3,3,4,4,4,3,3,2,3,3,4,3,3,2,2,2,3,3,3,2,2,1,2,2,3,2,2,1,1,1,2,2,2,1,1,2,1,1,2,1,1,2,2,2,1,1,1,2,2,3,2,2,1,2,2,3,3,3,2,2,2,3,3,4,3,3,2,3,3,4,4,4,3,3,3,4,4,3,4,4,3,4,4,3,3,3,4,4,4,3,3,2,3,3,4,3,3,2,2,2,3,3,3,2,2,1,2,2,3,2,2,1,1,1,2,2,2,1,1,2,1,1,2,1,1,2,2,2,1,1,1,2,2,3,2,2,1,2,2,3,3,3,2,2,2,3,3,4,3,3,2,3,3,4,4,4,3,3,3,4,4,3,4,4,3,4,4,3,3,3,4,4,4,3,3,2,3,3,4,3,3,2,2,2,3,3,3,2,2,1,2,2,3,2,2,1,1,1,2,2,2,1,1]
    },
    {
        name: 'pattern 2',
        squaresTypes: new Array(571).fill(undefined).map((value, index) => (Math.floor((index) % 6)) % 5)
    },
    {
        name: 'random',
        squaresTypes: new Array(571).fill(undefined).map(() => Math.floor(Math.random() * (5)))
    }

];

export default boardTemplates;