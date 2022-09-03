using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.WebApi.DTOs
{
    public class TokenResponse
    {
        public string AccessToken { get; set; }
        public DateTime ExpiresOnUtc { get; set; }
        public CurrentUser User { get; set; }
    }
}
