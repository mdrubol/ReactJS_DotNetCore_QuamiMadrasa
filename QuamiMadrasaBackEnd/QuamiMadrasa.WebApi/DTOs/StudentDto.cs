using QuamiMadrasa.Core.Entities;

namespace QuamiMadrasa.WebApi.DTOs
{
    public class StudentDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public int UserId { get; set; }

        public int MyClassId { get; set; }

        public int SectionId { get; set; }

        public string AdmNo { get; set; }

        public int? MyParentId { get; set; }

        public int? HostelId { get; set; }

        public string HostelRoomNo { get; set; }

        public string Session { get; set; }

        public string House { get; set; }

        public short? Age { get; set; }

        public string YearAdmitted { get; set; }
        public string AttendenceStatus { get; set; }
    }
}
