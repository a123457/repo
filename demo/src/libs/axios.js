import axios from 'axios'
var util = {}
util.ajax = axios.create({
	baseURL:'https://www.easy-mock.com/mock/5d2b165cd222885fb7e48c80/xzy/',
	timeout:20000
})
export default util
