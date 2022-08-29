using Microsoft.AspNetCore.Mvc;
using QuamiMadrasa.Controllers;
using System.Collections.Generic;

namespace QuamiMadrasa.Errors
{
    public class APIValidationErrorResponce : APIResponce
    {
        public APIValidationErrorResponce() : base(400)
        {

        }
        public IEnumerable<string> Errors { get; set; }

    }
}
