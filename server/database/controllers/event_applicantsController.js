const Event_applicantsService = require("../services/event_applicantsService");

class Event_applicantsController {

	static async createEvent_applicants(req, res, next){
		try {
			// const user_id = req.user_id;
			const user_id = '1';
			const event_id = req.body.event_id;
			const result = await Event_applicantsService.createEvent_applicants({event_id, user_id});
			res.status(201).json(result);
		} catch (error) {
			next(error);
		}
	}

	static async getAllEvent_applicants(req, res, next){
		try {
			const query = req.query;
			console.log("query: ", query);
			const result = await Event_applicantsService.getAllEvent_applicants(query);
			res.status(200).json(result);
		} catch (error) {
			next(error)
		}
	}
	
	static async getCategoryEvent_applicants(req, res, next){ //장르별 조회
		try {
			const options = req.query;
			console.log("options: ", options);
			const result = await Event_applicantsService.getCategoryEvent_applicants(options);
			console.log(result);
			if (result.errorMessage) {
				console.log('에러걸림');
        throw new Error(result.errorMessage)
      }
			
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

	// static async getSearchEvent_applicants(req, res, next){ //장르별 조회
	// 	try {
	// 		const input = req.params.input;
	// 		console.log("input: ", input);
	// 		const result = await Event_applicantsService.getSearchEvent_applicants(input);
	// 		console.log(result);
	// 		if (result.errorMessage) {
	// 			console.log('에러걸림');
  //       throw new Error(result.errorMessage)
  //     }
			
	// 		res.status(200).json(result);
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// }
	
	static async getOneEvent_applicants(req, res, next){
		try {
			const event_id = req.params.event_id;
			const result = await Event_applicantsService.getOneEvent_applicants({event_id});
			res.status(200).json(result);
		} catch (error) {
			next(error)
		}
	}

	static async updateEvent_applicants(req, res, next){
		try {
			const event_id = req.params.event_id;
        const toUpdate = {...req.body};

			const result = await Event_applicantsService.updateEvent_applicants({ event_id, toUpdate });
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

	static async deleteEvent_applicants(req, res, next){
		try {
			const event_id = req.params.event_id;

			const result = await Event_applicantsService.deleteEvent_applicants({ event_id });
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

}

module.exports = Event_applicantsController;