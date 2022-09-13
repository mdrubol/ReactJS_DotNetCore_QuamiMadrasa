using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace QuamiMadrasa.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : BaseController
    {
        public TestController()
        {

        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> TestAuthorization()
        {
            string msg = @"কওমি মাদ্রাসা স্কুল বা কলেজের শিক্ষার্থী একটি পৃথক ধারার শিক্ষা ব্যবস্থা।
                এই শিক্ষা ব্যবস্থার মূল লক্ষ্য শিক্ষার্থীদের ইসলামী জ্ঞান অর্জনে সহায়তা করা। 
                শিক্ষার্থীদের মধ্যে থেকে আলেম-ওলামা, হাফেজ তৈরি করা। 
                তাই কওমি মাদ্রাসার শিক্ষার্থীদের পড়াশোনার ধরনের স্কুল-কলেজের
                শিক্ষার্থীদের পড়াশোনা ধরনের থেকে আলাদা।

                 কওমি মাদ্রাসা স্কুল বা কলেজের শিক্ষার্থী একটি পৃথক ধারার শিক্ষা ব্যবস্থা।
                এই শিক্ষা ব্যবস্থার মূল লক্ষ্য শিক্ষার্থীদের ইসলামী জ্ঞান অর্জনে সহায়তা করা। 
                শিক্ষার্থীদের মধ্যে থেকে আলেম-ওলামা, হাফেজ তৈরি করা। 
                তাই কওমি মাদ্রাসার শিক্ষার্থীদের পড়াশোনার ধরনের স্কুল-কলেজের
                শিক্ষার্থীদের পড়াশোনা ধরনের থেকে আলাদা।
                 কওমি মাদ্রাসা স্কুল বা কলেজের শিক্ষার্থী একটি পৃথক ধারার শিক্ষা ব্যবস্থা।
                এই শিক্ষা ব্যবস্থার মূল লক্ষ্য শিক্ষার্থীদের ইসলামী জ্ঞান অর্জনে সহায়তা করা। 
                শিক্ষার্থীদের মধ্যে থেকে আলেম-ওলামা, হাফেজ তৈরি করা। 

                 কওমি মাদ্রাসা স্কুল বা কলেজের শিক্ষার্থী একটি পৃথক ধারার শিক্ষা ব্যবস্থা।
                এই শিক্ষা ব্যবস্থার মূল লক্ষ্য শিক্ষার্থীদের ইসলামী জ্ঞান অর্জনে সহায়তা করা। 
                শিক্ষার্থীদের মধ্যে থেকে আলেম-ওলামা, হাফেজ তৈরি করা। 
                ";

            return Ok(await Task.FromResult(msg));
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("admin")]
        public async Task<IActionResult> TestAdminAuthorization()
        {
            string msg = @"Admin => Take rest everything is well.According to Theo Haimann, 
                                “Administration means overall determination of policies, 
                                setting of major objectives, 
                                the identification of general purposes and laying 
                                down of broad programmes and projects”.
                                It refers to the activities of higher level.";

            return Ok(await Task.FromResult(msg));
        }

        [HttpGet]
        [Authorize(Roles = "Teacher")]
        [Route("teacher")]
        public async Task<IActionResult> TestTeacherAuthorization()
        {
            string msg = @"Teacher => Take rest everything is well.What is teacher short note?
                                A teacher is a person who helps 
                                people to learn. A teacher often works in a classroom.
                                There are many different kinds of teachers.
                                Some teachers teach young children 
                                in kindergarten or primary schools.";

            return Ok(await Task.FromResult(msg));
        }

        [HttpGet]
        [Authorize(Roles = "Accountant")]
        [Route("accountant")]
        public async Task<IActionResult> TestAccountantAuthorization()
        {
            string msg = @"Accountant => Take rest everything is well.An accountant is a professional 
                                            who is responsible for keeping and interpreting
                                            financial records. Most accountants are responsible
                                            for a wide range of finance-related tasks, 
                                            either for individual clients or for larger 
                                            businesses and organizations employing them.";

            return Ok(await Task.FromResult(msg));
        }
    }
}
