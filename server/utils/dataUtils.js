const loansformatDate = (result) => {	
	console.log(result);
	console.log("eventFormatDate: ", result.length);
	let tmp = result;

	if (Array.isArray(tmp)) {
		console.log('배열임');
		tmp = tmp.map(el => el.get({ plain: true }));
		tmp.map((order, index) => {
			const { loan_date, due_date } = tmp[index];
			tmp[index].loan_date = new Date(loan_date.setHours(loan_date.getHours() + 9));
			tmp[index].loan_date = tmp[index].loan_date.toISOString().split('T')[0];
			tmp[index].due_date = new Date(due_date.setHours(due_date.getHours() + 9));
			tmp[index].due_date = tmp[index].due_date.toISOString().split('T')[0];
		})
	}else if (!Array.isArray(tmp)) {
		console.log("들어옴");
		console.log("tmp: ", tmp);
			tmp.loan_date = new Date(tmp.loan_date.setHours(tmp.loan_date.getHours() + 9));
			tmp.loan_date = tmp.loan_date.toISOString().split('T')[0];
			tmp.due_date = new Date(tmp.due_date.setHours(tmp.due_date.getHours() + 9));
			tmp.due_date = tmp.due_date.toISOString().split('T')[0];
	} else {
		console.log('뭐ㅑ');
	}
	return tmp
}

const faqFormatDate = (result) => {	
	console.log(result);
	console.log("eventFormatDate: ", result.length);
	let tmp = result;

	if (Array.isArray(tmp)) {
		console.log('배열임', tmp);
		tmp = tmp.map(el => el.get({ plain: true }));
		tmp.map((order, index) => {
			const { created_at } = tmp[index];
			tmp[index].created_at = new Date(created_at.setHours(created_at.getHours() + 9));
			tmp[index].created_at = tmp[index].created_at.toISOString().split('T')[0];
		})
	}else if (!Array.isArray(tmp)) {
		console.log("들어옴");
		console.log("tmp: ", tmp);
			tmp.created_at = new Date(tmp.created_at.setHours(tmp.created_at.getHours() + 9));
			tmp.created_at = tmp.created_at.toISOString().split('T')[0];
	} else {
		console.log('뭐ㅑ');
	}
	return tmp
	// const tmp = result.map(el => el.get({ plain: true }));
	// tmp.map((order, index) => {
	// 	const { faq_response_time, created_at } = tmp[index];
	// 		tmp[index].created_at = new Date(created_at.setHours(created_at.getHours() + 9));
	// 		tmp[index].created_at = tmp[index].created_at.toISOString().split('T')[0];
	// 		if(faq_response_time){
	// 			tmp[index].faq_response_time = new Date(faq_response_time.setHours(faq_response_time.getHours() + 9));
	// 			tmp[index].faq_response_time = tmp[index].faq_response_time.toISOString().split('T')[0];	
	// 		}
	// })
	// return tmp
}

const faqFormatDate2 = (result) => {	
	console.log(result);
	console.log("eventFormatDate: ", result.length);
	let tmp = result;

	if (Array.isArray(tmp)) {
		console.log('배열임', tmp[0]);
		tmp = tmp[0].map(el => el.get({ plain: true }));
		tmp.map((order, index) => {
			const { created_at } = tmp[index];
			tmp[index].created_at = new Date(created_at.setHours(created_at.getHours() + 9));
			tmp[index].created_at = tmp[index].created_at.toISOString().split('T')[0];
		})
	}else if (!Array.isArray(tmp)) {
		console.log("들어옴");
		console.log("tmp: ", tmp);
			tmp.created_at = new Date(tmp.created_at.setHours(tmp.created_at.getHours() + 9));
			tmp.created_at = tmp.created_at.toISOString().split('T')[0];
	} else {
		console.log('뭐ㅑ');
	}
	return tmp
}

const eventFormatDate = (result) => {	
	console.log("eventFormatDate: ", result.length);
	let tmp = result;
	if (Array.isArray(tmp)) {
		console.log('배열임');
		tmp = tmp.map(el => el.get({ plain: true }));
		tmp.map((order, index) => {
			const { event_start_date, event_end_date } = tmp[index];
	
			tmp[index].event_start_date = new Date(event_start_date.setHours(event_start_date.getHours() + 9));
			tmp[index].event_start_date = tmp[index].event_start_date.toISOString().split('T')[0];
	
			tmp[index].event_end_date = new Date(event_end_date.setHours(event_end_date.getHours() + 9));
			tmp[index].event_end_date = tmp[index].event_end_date.toISOString().split('T')[0];
		})
	}else if (!Array.isArray(tmp)) {
		console.log("들어옴");
		console.log("tmp: ", tmp);
		console.log("tmp.event_end_date: ", tmp.event_start_date);
		tmp.event_start_date = new Date(tmp.event_start_date.setHours(tmp.event_start_date.getHours() + 9));
		tmp.event_start_date = tmp.event_start_date.toISOString().split('T')[0];

		tmp.event_end_date = new Date(tmp.event_end_date.setHours(tmp.event_end_date.getHours() + 9));
		tmp.event_end_date = tmp.event_end_date.toISOString().split('T')[0];
		console.log(tmp);
	}else{
		console.log('뭐ㅑ');
	}
	return tmp
}

const userFormat = (result) => {
	const tmp = result.map(el => el.get({ plain: true }));
	tmp.map((order, index) => {
		const { user_phone, created_at } = tmp[index];
		tmp[index].created_at = new Date(created_at.setHours(created_at.getHours() + 9));
		tmp[index].created_at = tmp[index].created_at.toISOString().split('T')[0];
		if(user_phone){
			tmp[index].user_phone = user_phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
		}
	})
	return tmp
}

const reviewFormat = (result) => {	
	console.log(result);
	console.log("reviewFormatDate: ", result.length);
	let tmp = result;

	if (Array.isArray(tmp)) {
		console.log('배열임', tmp);
		tmp = tmp.map(el => el.get({ plain: true }));
		tmp.map((order, index) => {
			const { created_at } = tmp[index];
			tmp[index].created_at = new Date(created_at.setHours(created_at.getHours() + 9));
			tmp[index].created_at = tmp[index].created_at.toISOString().split('T')[0];
		})
	}else if (!Array.isArray(tmp)) {
		console.log("들어옴");
		console.log("tmp: ", tmp);
			tmp.created_at = new Date(tmp.created_at.setHours(tmp.created_at.getHours() + 9));
			tmp.created_at = tmp.created_at.toISOString().split('T')[0];
	} else {
		console.log('뭐ㅑ');
	}
	return tmp
}

// const bannerFormat = (result) => {	
// 	console.log(result);
// 	console.log("reviewFormatDate: ", result.length);
// 	let tmp = result;

// 	if (Array.isArray(tmp)) {
// 		console.log('배열임', tmp);
// 		tmp = tmp.map(el => el.get({ plain: true }));
// 		tmp.map((order, index) => {
// 			const { created_at } = tmp[index];
// 			tmp[index].created_at = new Date(created_at.setHours(created_at.getHours() + 9));
// 			tmp[index].created_at = tmp[index].created_at.toISOString().split('T')[0];
// 		})
// 	}else if (!Array.isArray(tmp)) {
// 		console.log("들어옴");
// 		console.log("tmp: ", tmp);
// 			tmp.created_at = new Date(tmp.created_at.setHours(tmp.created_at.getHours() + 9));
// 			tmp.created_at = tmp.created_at.toISOString().split('T')[0];
// 	} else {
// 		console.log('뭐ㅑ');
// 	}
// 	return tmp
// }


  module.exports = { loansformatDate, faqFormatDate, eventFormatDate, userFormat, faqFormatDate2, reviewFormat};