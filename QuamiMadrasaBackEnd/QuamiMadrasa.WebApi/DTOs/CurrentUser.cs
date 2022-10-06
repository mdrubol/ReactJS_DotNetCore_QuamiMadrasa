namespace QuamiMadrasa.WebApi.DTOs
{
    public class CurrentUser
    {
        public int UserId { get; set; }
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public string UserName { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public string Email { get; set; }
        public List<string> Roles { get; set; }
    }
}
