const responseToTimeseries = (response) => {
    // your implementation goes here

    //finding the longest length of data in response, needed later on responseWithZeroes map
    const dataLength = response.reduce((a, c) => a < c.data.length ? c.data.length : a, 0);

    //mapping the input so that the "empty" times have zeroes on them
    //the final output is much easier to build this way
    const responseWithZeroes = response.map(r => {
        const data = [ ...r.data ];
        while(data.length < dataLength){
            data.push([data[0][0] + data.length, 0]);
        }
        return { data }
    });

    //building the actual output
    const times = responseWithZeroes.reduce((o, c) => {

        //extracting times and points into separate arrays
        const times = c.data.map(t => t[0]);
        const p = c.data.map(t => t[1]);

        //building the output object with a reduce
        const timesObj = times.reduce((a, curr, i) => {
            //If object already has a property curr, concat. Otherwise put [p[i]] into points
            const points = o.hasOwnProperty(curr) ? o[curr].points.concat(p[i]) : [p[i]];
            return { ...a, [curr]: { 
                x: curr, 
                points,
                total: points.reduce((sum, current) => sum + current)
            } 
        }}, {});

        return { ...o, ...timesObj };
    }, {});

    return times;
};