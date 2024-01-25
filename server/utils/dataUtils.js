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
			tmp[index].loan_date = `${loan_date.getFullYear()}-${(loan_date.getMonth() + 1).toString().padStart(2, '0')}-${loan_date.getDate().toString().padStart(2, '0')} ${loan_date.getHours().toString().padStart(2, '0')}:${loan_date.getMinutes().toString().padStart(2, '0')}`;
			tmp[index].due_date = new Date(due_date.setHours(due_date.getHours() + 9));
			tmp[index].due_date = `${due_date.getFullYear()}-${(due_date.getMonth() + 1).toString().padStart(2, '0')}-${due_date.getDate().toString().padStart(2, '0')} ${due_date.getHours().toString().padStart(2, '0')}:${due_date.getMinutes().toString().padStart(2, '0')}`;
		})
	}else if (!Array.isArray(tmp)) {
		console.log("들어옴");
		console.log("tmp: ", tmp);
			tmp.loan_date = new Date(tmp.loan_date.setHours(tmp.loan_date.getHours() + 9));
			tmp.loan_date = `${tmp.loan_date.getFullYear()}-${(tmp.loan_date.getMonth() + 1).toString().padStart(2, '0')}-${tmp.loan_date.getDate().toString().padStart(2, '0')} ${tmp.loan_date.getHours().toString().padStart(2, '0')}:${tmp.loan_date.getMinutes().toString().padStart(2, '0')}`;
			tmp.due_date = new Date(tmp.due_date.setHours(tmp.due_date.getHours() + 9));
			tmp.due_date = `${tmp.due_date.getFullYear()}-${(tmp.due_date.getMonth() + 1).toString().padStart(2, '0')}-${tmp.due_date.getDate().toString().padStart(2, '0')} ${tmp.due_date.getHours().toString().padStart(2, '0')}:${tmp.due_date.getMinutes().toString().padStart(2, '0')}`;
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
			const { created_at, faq_response_time } = tmp[index];
			tmp[index].created_at = new Date(created_at.setHours(created_at.getHours() + 9));
			tmp[index].created_at = `${created_at.getFullYear()}-${(created_at.getMonth() + 1).toString().padStart(2, '0')}-${created_at.getDate().toString().padStart(2, '0')} ${created_at.getHours().toString().padStart(2, '0')}:${created_at.getMinutes().toString().padStart(2, '0')}`;
			if(tmp[index].faq_response_time){
				tmp[index].faq_response_time = `${faq_response_time.getFullYear()}-${(faq_response_time.getMonth() + 1).toString().padStart(2, '0')}-${faq_response_time.getDate().toString().padStart(2, '0')} ${faq_response_time.getHours().toString().padStart(2, '0')}:${faq_response_time.getMinutes().toString().padStart(2, '0')}`;
			}
		})
	}else if (!Array.isArray(tmp)) {
		console.log("들어옴");
		console.log("tmp: ", tmp);
			tmp.created_at = new Date(tmp.created_at.setHours(tmp.created_at.getHours() + 9));
			tmp.created_at = tmp.created_at.toISOString().split('T')[0];
			if(tmp[index].faq_response_time){
			tmp[index].faq_response_time = `${tmp[index].faq_response_time.getFullYear()}-${(tmp[index].faq_response_time.getMonth() + 1).toString().padStart(2, '0')}-${tmp[index].faq_response_time.getDate().toString().padStart(2, '0')} ${tmp[index].faq_response_time.getHours().toString().padStart(2, '0')}:${tmp[index].faq_response_time.getMinutes().toString().padStart(2, '0')}`;
			}
		} else {
		console.log('뭐ㅑ');
	}
	return tmp
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
			tmp[index].created_at = `${tmp[index].created_at.getFullYear()}-${(tmp[index].created_at.getMonth() + 1).toString().padStart(2, '0')}-${tmp[index].created_at.getDate().toString().padStart(2, '0')} ${tmp[index].created_at.getHours().toString().padStart(2, '0')}:${tmp[index].created_at.getMinutes().toString().padStart(2, '0')}`;
		})
	}else if (!Array.isArray(tmp)) {
		console.log("들어옴");
		console.log("tmp: ", tmp);
			tmp.created_at = new Date(tmp.created_at.setHours(tmp.created_at.getHours() + 9));
			tmp.created_at = `${tmp.created_at.getFullYear()}-${(tmp.created_at.getMonth() + 1).toString().padStart(2, '0')}-${tmp.created_at.getDate().toString().padStart(2, '0')} ${tmp.created_at.getHours().toString().padStart(2, '0')}:${tmp.created_at.getMinutes().toString().padStart(2, '0')}`;
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
		console.log("티엠피 : ", tmp);
		tmp.map((order, index) => {
			const { event_start_date, event_end_date } = tmp[index];
	
			tmp[index].event_start_date = new Date(event_start_date.setHours(event_start_date.getHours() + 9));
			tmp[index].event_start_date = `${event_start_date.getFullYear()}-${(event_start_date.getMonth() + 1).toString().padStart(2, '0')}-${event_start_date.getDate().toString().padStart(2, '0')} ${event_start_date.getHours().toString().padStart(2, '0')}:${event_start_date.getMinutes().toString().padStart(2, '0')}`;
	
			tmp[index].event_end_date = new Date(event_end_date.setHours(event_end_date.getHours() + 9));
			tmp[index].event_end_date = `${event_end_date.getFullYear()}-${(event_end_date.getMonth() + 1).toString().padStart(2, '0')}-${event_end_date.getDate().toString().padStart(2, '0')} ${event_end_date.getHours().toString().padStart(2, '0')}:${event_end_date.getMinutes().toString().padStart(2, '0')}`;
		})
	}else if (!Array.isArray(tmp)) {
		console.log("들어옴");
		console.log("tmp: ", tmp);
		console.log("tmp.event_end_date: ", tmp.event_start_date);
		tmp.event_start_date = new Date(tmp.event_start_date.setHours(tmp.event_start_date.getHours() + 9));
		tmp.event_start_date = `${tmp.event_start_date.getFullYear()}-${(tmp.event_start_date.getMonth() + 1).toString().padStart(2, '0')}-${tmp.event_start_date.getDate().toString().padStart(2, '0')} ${tmp.event_start_date.getHours().toString().padStart(2, '0')}:${tmp.event_start_date.getMinutes().toString().padStart(2, '0')}`;

		tmp.event_end_date = new Date(tmp.event_end_date.setHours(tmp.event_end_date.getHours() + 9));
		tmp.event_end_date = `${tmp.event_end_date.getFullYear()}-${(tmp.event_end_date.getMonth() + 1).toString().padStart(2, '0')}-${tmp.event_end_date.getDate().toString().padStart(2, '0')} ${tmp.event_end_date.getHours().toString().padStart(2, '0')}:${tmp.event_end_date.getMinutes().toString().padStart(2, '0')}`;
		console.log(tmp);
	}else{
		console.log('뭐ㅑ');
	}
	return tmp
}

const eventApplicantsFormatDate = (result) => {	
	console.log("eventFormatDate: ", result.length);
	let tmp = result;
	if (Array.isArray(tmp)) {
		console.log('배열임');
		tmp = tmp.map(el => el.get({ plain: true }));
		console.log("티엠피 : ", tmp);
		tmp.map((order, index) => {
			const { event_start_date, event_end_date } = tmp[index].Event;
	
			tmp[index].Event.event_start_date = new Date(event_start_date.setHours(event_start_date.getHours() + 9));
			tmp[index].Event.event_start_date = `${event_start_date.getFullYear()}-${(event_start_date.getMonth() + 1).toString().padStart(2, '0')}-${event_start_date.getDate().toString().padStart(2, '0')} ${event_start_date.getHours().toString().padStart(2, '0')}:${event_start_date.getMinutes().toString().padStart(2, '0')}`;
	
			tmp[index].Event.event_end_date = new Date(event_end_date.setHours(event_end_date.getHours() + 9));
			tmp[index].Event.event_end_date = `${event_end_date.getFullYear()}-${(event_end_date.getMonth() + 1).toString().padStart(2, '0')}-${event_end_date.getDate().toString().padStart(2, '0')} ${event_end_date.getHours().toString().padStart(2, '0')}:${event_end_date.getMinutes().toString().padStart(2, '0')}`;
		})
	}else if (!Array.isArray(tmp)) {
		console.log("들어옴");
		console.log("tmp: ", tmp);
		console.log("tmp.event_end_date: ", tmp.Event.event_start_date);
		tmp.Event.event_start_date = new Date(tmp.Event.event_start_date.setHours(tmp.Event.event_start_date.getHours() + 9));
		tmp.Event.event_start_date = `${tmp.Event.event_start_date.getFullYear()}-${(tmp.Event.event_start_date.getMonth() + 1).toString().padStart(2, '0')}-${tmp.Event.event_start_date.getDate().toString().padStart(2, '0')} ${tmp.Event.event_start_date.getHours().toString().padStart(2, '0')}:${tmp.Event.event_start_date.getMinutes().toString().padStart(2, '0')}`;

		tmp.Event.event_end_date = new Date(tmp.Event.event_end_date.setHours(tmp.Event.event_end_date.getHours() + 9));
		tmp.Event.event_end_date = `${tmp.Event.event_end_date.getFullYear()}-${(tmp.Event.event_end_date.getMonth() + 1).toString().padStart(2, '0')}-${tmp.Event.event_end_date.getDate().toString().padStart(2, '0')} ${tmp.Event.event_end_date.getHours().toString().padStart(2, '0')}:${tmp.Event.event_end_date.getMinutes().toString().padStart(2, '0')}`;
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
		tmp[index].created_at = `${created_at.getFullYear()}-${(created_at.getMonth() + 1).toString().padStart(2, '0')}-${created_at.getDate().toString().padStart(2, '0')} ${created_at.getHours().toString().padStart(2, '0')}:${created_at.getMinutes().toString().padStart(2, '0')}`;
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
			tmp[index].created_at = `${created_at.getFullYear()}-${(created_at.getMonth() + 1).toString().padStart(2, '0')}-${created_at.getDate().toString().padStart(2, '0')} ${created_at.getHours().toString().padStart(2, '0')}:${created_at.getMinutes().toString().padStart(2, '0')}`;
		})
	}else if (!Array.isArray(tmp)) {
		console.log("들어옴");
		console.log("tmp: ", tmp);
			tmp.created_at = new Date(tmp.created_at.setHours(tmp.created_at.getHours() + 9));
			tmp.created_at = `${tmp.created_at.getFullYear()}-${(tmp.created_at.getMonth() + 1).toString().padStart(2, '0')}-${tmp.created_at.getDate().toString().padStart(2, '0')} ${tmp.created_at.getHours().toString().padStart(2, '0')}:${tmp.created_at.getMinutes().toString().padStart(2, '0')}`;
	} else {
		console.log('뭐ㅑ');
	}
	return tmp
}

const bannerFormatDate = (result) => {	
	console.log(result);
	console.log("reviewFormatDate: ", result.length);
	let tmp = result;

	if (Array.isArray(tmp)) {
		console.log('배열임', tmp);
		tmp = tmp.map(el => el.get({ plain: true }));
		tmp.map((order, index) => {
			const { createdAt, updatedAt } = tmp[index];
			tmp[index].createdAt = new Date(createdAt.setHours(createdAt.getHours() + 9));
			tmp[index].createdAt = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')} ${createdAt.getHours().toString().padStart(2, '0')}:${createdAt.getMinutes().toString().padStart(2, '0')}`;
			tmp[index].updatedAt = new Date(updatedAt.setHours(updatedAt.getHours() + 9));
			tmp[index].updatedAt = `${updatedAt.getFullYear()}-${(updatedAt.getMonth() + 1).toString().padStart(2, '0')}-${updatedAt.getDate().toString().padStart(2, '0')} ${updatedAt.getHours().toString().padStart(2, '0')}:${updatedAt.getMinutes().toString().padStart(2, '0')}`;
		})
	}else if (!Array.isArray(tmp)) {
		console.log("들어옴");
		console.log("tmp: ", tmp);
			tmp.createdAt = new Date(tmp.createdAt.setHours(tmp.createdAt.getHours() + 9));
			tmp.createdAt = `${tmp.createdAt.getFullYear()}-${(tmp.createdAt.getMonth() + 1).toString().padStart(2, '0')}-${tmp.createdAt.getDate().toString().padStart(2, '0')} ${tmp.createdAt.getHours().toString().padStart(2, '0')}:${tmp.createdAt.getMinutes().toString().padStart(2, '0')}`;
			tmp.updatedAt = new Date(tmp.updatedAt.setHours(tmp.updatedAt.getHours() + 9));
			tmp.updatedAt = `${tmp.updatedAt.getFullYear()}-${(tmp.updatedAt.getMonth() + 1).toString().padStart(2, '0')}-${tmp.updatedAt.getDate().toString().padStart(2, '0')} ${tmp.updatedAt.getHours().toString().padStart(2, '0')}:${tmp.updatedAt.getMinutes().toString().padStart(2, '0')}`;
	} else {
		console.log('뭐ㅑ');
	}
	return tmp
}



  module.exports = { loansformatDate, faqFormatDate, eventFormatDate, userFormat, faqFormatDate2, reviewFormat, eventApplicantsFormatDate, bannerFormatDate };
