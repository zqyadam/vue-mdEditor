export default `# Array数组
[TOC]
## 定义数组

### 用字面量创建
\`\`\`javascript
var arr = [1,2,3,'hello',null,true];
\`\`\`

### 用\`new Array()\`创建
\`\`\`javascript
var arr=new Array();
arr[0]=1;
arr[1]=2;
arr[2]=3;
arr[3]='hello';
...
\`\`\`
或
\`\`\`
var arr=new Array(1,2,3,'hello',null,true);
\`\`\`

## Array.indexOf
返回在数组中可以找到给定元素的第一个索引，如果不存在，则返回-1。
\`Array.indexOf(searchElement[,fromIndex = 0])\`

 - searchElement —— 要查找的元素
 - fromIndex —— 开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1。如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找 ，以此类推。 注意：如果参数中提供的索引值是一个负值，仍然从前向后查询数组。如果抵消后的索引值仍小于0，则整个数组都将会被查询。其默认值为0.

\`\`\`javascript
// 找出指定元素出现的所有位置
var indices = [];
var array = ['a', 'b', 'a', 'c', 'a', 'd'];
var element = 'a';
var idx = array.indexOf(element);
while (idx != -1) {
  indices.push(idx);
  idx = array.indexOf(element, idx + 1);
}
console.log(indices);
// [0, 2, 4]
\`\`\`

## Array.lastIndexOf
返回指定元素在数组中的最后一个的索引，如果不存在则返回-1,。从数组的后面向前查找，从fromIndex开始。
\`arr.lastIndexOf(searchElement[, fromIndex = arr.length -1])\`

- searchElement —— 被查找的元素
- fromIndex —— 从此位置开始逆向查找。默认为数组的长度减 1，即整个数组都被查找。如果该值大于或等于数组的长度，则整个数组会被查找。如果为负值，将其视为从数组末尾向前的偏移。即使该值为负，数组仍然会被从后向前查找。如果该值为负时，其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。

\`\`\`javascript
// 查找所有元素,下例使用 lastIndexOf 查找到一个元素在数组中所有的索引（下标），并使用 push 将所有添加到另一个数组中。
var indices = [];
var array = ['a', 'b', 'a', 'c', 'a', 'd'];
var element = 'a';
var idx = array.lastIndexOf(element);

while (idx != -1) {
  indices.push(idx);
  idx = (idx > 0 ? array.lastIndexOf(element, idx - 1) : -1);
}

console.log(indices);
// [4, 2, 0];
\`\`\`


## Array.slice
将数组的一部分浅拷贝, 返回到从开始到结束（不包括结束）选择的新数组对象。原始数组不会被修改。
\`arr.slice(begin, end)\`
- begin —— 从该处开始提取原数组中的元素（从0开始）
- end —— 在该处结束提取原数组的元素（从0开始）。slice会提取原数组中索引从begin到end的所有元素（包含begin，不包含end）

\`\`\`javascript
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
//起始索引1，终止索引3，获取的数组为原数组的1-2
var citrus = fruits.slice(1, 3);
// fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
// citrus contains ['Orange','Lemon']
\`\`\`

## Array.splice

可以从指定的索引开始删除若干个元素，然后再从该位置添加若干元素
\`Array.splice(startIndex,deleteCount,[item...])\`

\`\`\`javascript
//定义数组
var arr1 = ['Microsoft','Apple','Yahoo','AOL','Excite','Oracle'];

//从索引为2开始删除3个元素，然后再添加2个元素,返回删除的元素
arr1.splice(2,3,'Google','Facebook');  //删除的元素["Yahoo", "AOL", "Excite"],arr1为["Microsoft", "Apple", "Google", "Facebook", "Oracle"]

//只删除，不添加
arr1.splice(2,2);// 删除["Yahoo", "AOL"]，arr1为["Microsoft", "Apple", "Excite", "Oracle"]

//只添加，不删除
arr1.splice(2,0,"Google",'Facebook');
alert(arr1.toString());
//复制数组,结果为副本
var arrCopy = arr1.slice();
\`\`\`

## Array.push
将一个或多个元素添加到数组的末尾，并返回数组的长度。
\`arr.push(element1, ..., elementN)\`

\`\`\`javascript
var sports = ["soccer", "baseball"];
var total = sports.push("football", "swimming");
// ["soccer", "baseball", "football", "swimming"]
console.log(sports);
\`\`\`

## Array.pop
从数组中删除最后一个元素，并返回该元素的值。此方法改变数组的长度。
\`arr.pop()\`

\`\`\`javascript
let myFish = ["angel", "clown", "mandarin", "surgeon"];
let popped = myFish.pop();
console.log(myFish);
\`\`\`



## Array.shift
从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。
\`arr.shift()\`

\`\`\`javascript
let myFish = ['angel', 'clown', 'mandarin', 'surgeon'];
console.log('调用 shift 之前: ' + myFish);
// "调用 shift 之前: angel,clown,mandarin,surgeon"
var shifted = myFish.shift(); 
console.log('调用 shift 之后: ' + myFish); 
// "调用 shift 之后: clown,mandarin,surgeon" 
console.log('被删除的元素: ' + shifted); 
// "被删除的元素: angel"
\`\`\`

## Array.unshift
将一个或多个元素添加到数组的开头，并返回新数组的长度。
\`arr.unshift(element1, ..., elementN)\`

- element1, ..., elementN —— 要添加到数组开头的元素。

\`\`\`javascript
var arr = [1, 2];
arr.unshift(0); //result of call is 3, the new array length
//arr is [0, 1, 2]
arr.unshift(-2, -1); // = 5
//arr is [-2, -1, 0, 1, 2]
arr.unshift( [-3] );
//arr is [[-3], -2, -1, 0, 1, 2]
\`\`\`



## Array.sort
在适当的位置对数组的元素进行排序，并返回数组。\`sort\` 排序不一定是稳定的。默认排序顺序是根据字符串Unicode码点。
\`arr.sort([compareFunction])\`

- compareFunction —— 可选。用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的诸个字符的Unicode位点进行排序。

> - 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
- 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
- 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
- compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。

\`\`\`javascript
alert(arr.sort().toString());
\`\`\`

## Array.reverse
颠倒数组中元素的位置。第一个元素会成为最后一个，最后一个会成为第一个。

\`\`\`javascript
var myArray = ['one', 'two', 'three'];
myArray.reverse(); 

console.log(myArray) // ['three', 'two', 'one']
\`\`\`



## Array.concat
> concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

**语法**
>var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])

**参数**
> *valueN*
需要与原数组合并的数组或非数组值。详见下文。

**返回值**
>如果对象是 Array，则为true; 否则为false。

**描述**
>concat 方法将创建一个新的数组，然后将调用它的对象(this 指向的对象)中的元素以及所有参数中的数组类型的参数中的元素以及非数组类型的参数本身按照顺序放入这个新数组,并返回该数组.
>
concat 方法并不修改调用它的对象(this 指向的对象) 和参数中的各个数组本身的值,而是将他们的每个元素拷贝一份放在组合成的新数组中.原数组中的元素有两种被拷贝的方式:
>
 - 对象引用(非对象直接量):concat 方法会复制对象引用放到组合的新数组里,原数组和新数组中的对象引用都指向同一个实际的对象,所以,当实际的对象被修改时,两个数组也同时会被修改.
 - 字符串和数字(是原始值,而不是包装原始值的 String 和 Number 对象): concat 方法会复制字符串和数字的值放到新数组里.
注意: 连接一个或多个数组（值）将不会改变原本的数组/值。进一步说，任何对新数组的操作都不会对原有的数组造成影响（仅当该元素不是对象的引用时），反之亦然。

*该方法对数组的复制适用于非引用元素，当遇到对象或数组时，复制失效。*

**示例**
连接两个数组
\`\`\`
var alpha = ["a", "b", "c"];
var numeric = [1, 2, 3];

// 组成新数组 ["a", "b", "c", 1, 2, 3]; 原数组 alpha 和 numeric 未被修改
var alphaNumeric = alpha.concat(numeric);
\`\`\`

连接三个数组
\`\`\`
var num1 = [1, 2, 3];
var num2 = [4, 5, 6];
var num3 = [7, 8, 9];

// 组成新数组[1, 2, 3, 4, 5, 6, 7, 8, 9]; 原数组 num1, num2, num3 未被修改
var nums = num1.concat(num2, num3);
\`\`\`

将非数组值合并到数组里
\`\`\`
var alpha = ['a', 'b', 'c'];

// 组成新数组 ["a", "b", "c", 1, 2, 3], 原alpha数组未被修改
var alphaNumeric = alpha.concat(1, [2, 3]);
\`\`\`
对对象或数组的引用
\`\`\`
var a = [{ name: 'xiaoming', age: 18 }, { name: 'xiaopang', age: 20 }];
var b = [1, 2];
var c = a.concat(b);
console.log(c); // concat_pic_1
c[0].name = 'mingming'
console.log(c); // concat_pic_2
\`\`\`

![concat_pic_1](http://upload-images.jianshu.io/upload_images/2509634-2d33132ca5905a37.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![concat_pic_2](http://upload-images.jianshu.io/upload_images/2509634-73106ae6e1ba8260.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Array.join
将当前数组的每个元素都用指定的字符串连接起来，然后返回连接后的字符串。
\`Array.join([separator = ","])\`

- separator —— 分割符，默认为","

\`\`\`javascript
var a = ['Wind', 'Rain', 'Fire'];
var myVar1 = a.join();      // myVar1的值变为"Wind,Rain,Fire"
var myVar2 = a.join(', ');  // myVar2的值变为"Wind, Rain, Fire"
var myVar3 = a.join(' + '); // myVar3的值变为"Wind + Rain + Fire"
var myVar4 = a.join('');    // myVar4的值变为"WindRainFire"
\`\`\`
## Array.keys
返回一个新的Array迭代器，它包含数组中每个索引的键。
\`arr.keys()\`

\`\`\`javascript
var arr = ["a", "b", "c"];
var iterator = arr.keys();

console.log(iterator.next()); // { value: 0, done: false }
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
\`\`\`

## Array.toLocaleString
 返回一个字符串表示数组中的元素。数组中的元素将使用各自的\`toLocaleString\`方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。
 
\`\`\`javascript
var number = 1337;
var date = new Date();
var myArr = [number, date, "foo"];
var str = myArr.toLocaleString(); 
console.log(str); 
// 输出 "1337,2015/2/27 下午8:29:04,foo" 
// 假定运行在中文（zh-CN）环境，北京时区
\`\`\`


##多维数组

\`\`\`javascript
var arr1 = [[1,2,3],[4,5],['abc','def','ghj','hhh']];
var str='';
for (var i=0;i<arr1.length ; i++ )
{
  for (var j=0; j<arr1[i].length ; j++ )
  { 
    str =str +arr1[i][j]+';' ;
  }
  str +="\n";
}
alert(str);
\`\`\`

## Array.every
对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true。
\`Array.every(function(item, index, array){})\`

 -  item —— 数组中的每一项
 -  index —— 当前项的索引
 -  array —— 数组本身

\`\`\`javascript
var arr = [1, 2, 3, 'blue', 'red'];
arr.every(function(item, index, array){
    return typeof item == 'number';
}); //false
\`\`\`
由于第4、5项结果为false，因此不满足所有返回值都要求是true的条件，因此返回值为false。

## Array.some
对数组中的每一项运行给定函数，如果函数对任一项返回true，则返回true。
\`Array.some(function(item, index, array){})\`各项参数同every
\`\`\`javascript
var arr = [1, 2, 3, 'blue', 'red'];
arr.some(function(item, index, array){
    console.log(item);
    return typeof item == 'number';
}); // true 
\`\`\`
由于第1项即为true，已满足任一项为true的条件，因此停止对数组的遍历（迭代），返回true。

## Array.filter
对数组中的每一项运行给定函数，返回由该函数中返回值为true的项所组成的数组。
\`Array.filter(function(item, index, array){})\`各项参数同every
\`\`\`javascript
var arr = [1, 2, 3, 'blue', 'red'];
arr.filter(function(item, index, array){
    return typeof item == 'number';
}); // [1, 2, 3]
\`\`\`
由于第4、5项不是数字，所以没有包含在返回值中。

## Array.map
对数组中的每一项运行给定函数，返回由函数运行结果所组成的数组。
\`Array.map(function(item, index, array){})\`各项参数同every
\`\`\`javascript
var arr = [1, 2, 3, 'blue', 'red'];
arr.map(function(item, index, array){
    return typeof item == 'number';
}); // [true, true, true, false, false]
\`\`\`
判断数组中的每一项是否为数字，结果分别为[true, true, true, false, false],即为返回值。

## Array.forEach
对数组中的每一项运行给定函数，无返回值。
\`Array.forEach(function(item, index, array){})\`各项参数同every
\`\`\`javascript
var arr = [1, 2, 3, 'blue', 'red'];
arr.forEach(function(item, index, array){
    // 对数字+1
    if(typeof item == 'number'){  
        array[index]  = item +1
    }
});  // arr = [2, 3, 4, "blue", "red"]
\`\`\`

## Array.find
返回数组中满足提供的测试函数的第一个元素的值，否则返回undefined。
\`Array.find(function(item, index, array){})\`各项参数同上。

\`\`\`javascript
var inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];
function findCherries(fruit) { 
    return fruit.name === 'cherries';
}
console.log(inventory.find(findCherries)); // { name: 'cherries', quantity: 5 }
\`\`\`

## Array.findIndex
返回数组中满足提供的测试函数的第一个元素的索引，否则返回-1。
\`Array.findIndex(function(item, index, array){})\`各项参数同上。

\`\`\`javascript
function isPrime(element, index, array) {
    var start = 2;
    while (start <= Math.sqrt(element)) {
        if (element % start++ < 1) return false;
    }
    return (element > 1);
}
console.log( [4, 6, 8, 12].findIndex(isPrime) ); // -1, 没找到质数元素
console.log( [4, 6, 7, 12].findIndex(isPrime) ); // 2
\`\`\`
## Array.includes
用来判断当前数组是否包含指定的值，如果是，则返回True，否则返回False。
\`Array.includes(searchElement[,fromIndex=0])\`

 - searchElement —— 要查找的元素
 - fromIndex —— 从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0。

\`\`\`javascript
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
\`\`\`

**includes() 作为一个通用方法**
>includes() 方法有意设计为通用方法。它不要求this值是数组对象，所以它可以被用于其他类型的对象 (比如类数组对象)。下面的例子展示了 在函数的arguments对象上调用的includes() 方法。

\`\`\`javascript
(function() {
  console.log([].includes.call(arguments, 'a')); // true
  console.log([].includes.call(arguments, 'd')); // false
})('a','b','c');
\`\`\`

## Array.reduce
对累加器和数组的每个值（从左到右）应用一个函数，以将其减少为单个值。
\`arr.reduce(function(accumulator, currentValue, currentIndex, array){}[, initialValue])\`

- accumulator —— 上一次调用回调返回的值，或者是提供的初始值（initialValue）
- currentValue —— 数组中正在处理的元素
- currentIndex —— 数据中正在处理的元素索引，如果提供了 initialValue ，从0开始；否则从1开始
- array —— 调用 reduce 的数组
- initialValue —— 可选项，其值用于第一次调用 callback 的第一个参数。

\`\`\`javascript
let sum = [0, 1, 2, 3].reduce(function(acc, val) {
  return acc + val;
}, 0);
// 6
console.log(sum);
\`\`\`

## Array.reduceRight
接受一个函数作为累加器（accumulator），让每个值（从右到左，亦即从尾到头）缩减为一个值。（与 reduce() 的执行方向相反）。
\`arr.reduceRight(function(previousValue, currentValue, currentIndex, array){}[, initialValue])\`

- previousValue —— 上一次调用回调的返回值，或提供的 initialValue
- currentValue —— 当前被处理的元素
- index —— 当前处理元素的索引
- array —— 调用 reduce 的数组
- initialValue —— 可作为第一次调用回调 callback 的第一个参数

\`\`\`javascript
var flattened = [[0, 1], [2, 3], [4, 5]].reduceRight(function(a, b) {
    return a.concat(b);
}, []);
// flattened is [4, 5, 2, 3, 0, 1]
\`\`\`


MDN:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/
`