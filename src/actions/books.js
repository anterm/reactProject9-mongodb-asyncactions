import config from '../../config/constants'
import asyncRequest from '../utils/request'


export const fetch = () => dispatch => {
	const params = { 
		url: `${config.site_url}/api/books`
	}

	return dispatch({
	  types: ['BOOKS_REQUEST', 'BOOKS_SUCCESS', 'BOOKS_FAILURE'],
	  callAPI: () => asyncRequest(params)
	})
}


export const add = book => dispatch => {
	const params = {
		url: `/api/books`,
		method: "post",
		data: book
	}

	return asyncRequest(params).then(book => {
		dispatch({ type: 'ADD_BOOK', book })
		return book
	})
}


export const change = book => dispatch => {
	const params = { 
		url: `/api/books/${book._id}`,
		method: "put", 
		data: book 
	}

	return asyncRequest(params).then(() => {
		dispatch({ type: 'CHANGE_BOOK', book })
	})
}


export const remove = id => dispatch => {
	const params = { 
		url: `/api/books/${id}`,
		method: "del"
	}

	return asyncRequest(params).then(() => {
		dispatch({ type: 'REMOVE_BOOK', id })
	})
}