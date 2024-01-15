const formatDate = (result) => {	
	const tmp = result.map(el => el.get({ plain: true }));
	tmp.map((order, index) => {
		const { created_at } = tmp[index];
		tmp[index].created_at = new Date(created_at.setHours(created_at.getHours() + 9));
		tmp[index].created_at = tmp[index].created_at.toISOString().split('T')[0];
	})
	return tmp
  }

  const faqFormatDate = (result) => {	
	const tmp = result.map(el => el.get({ plain: true }));
	tmp.map((order, index) => {
		const { faq_response_time, created_at } = tmp[index];
			tmp[index].created_at = new Date(created_at.setHours(created_at.getHours() + 9));
			tmp[index].created_at = tmp[index].created_at.toISOString().split('T')[0];
			if(faq_response_time){
				tmp[index].faq_response_time = new Date(faq_response_time.setHours(faq_response_time.getHours() + 9));
				tmp[index].faq_response_time = tmp[index].faq_response_time.toISOString().split('T')[0];	
			}
	})
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

  module.exports = { formatDate, faqFormatDate, userFormat };
