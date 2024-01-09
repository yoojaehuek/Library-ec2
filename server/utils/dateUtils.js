const formatDate = (result) => {	
	const tmp = result.map(el => el.get({ plain: true }));
	// console.log(result);
	tmp.map((order, index) => {
		const { created_at } = tmp[index];
	
		// console.log(`${created_at.getFullYear()}-${created_at.getMonth()+1}-${created_at.getDate()}`);
		tmp[index].created_at = new Date(created_at.setHours(created_at.getHours() + 9));
		tmp[index].created_at = tmp[index].created_at.toISOString().split('T')[0];
	})
	return tmp
  }

  module.exports = { formatDate };
