using System.ComponentModel.DataAnnotations;

namespace FormValidation.Models
{
    public class Person
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Podaj numer rejestracyjny")]
        [RegularExpression("[A-Z]{2,3}[0-9]{4,6}", ErrorMessage = "Rejestracja jest niepoprawna")]
        public string Rejestracja { get; set; }

        [Required(ErrorMessage = "Podaj datę pierwszej rejestracji")]
        [DataType(DataType.Date)]
        public string Data { get; set; }

        [Required(ErrorMessage = "Podaj markę pojazdu")]
        [RegularExpression("[a-zA-Z]+", ErrorMessage = "Podana marka jest niepoprawna")]
        public string Marka { get; set; }

        [Required(ErrorMessage = "Podaj rok proodukcji")]
        [RegularExpression("[0-9]{4}", ErrorMessage = "Podany rok produkcji jest niepoprawny")]
        public string RokProdukcji { get; set; }

        [Required(ErrorMessage = "Podaj rodzaj paliwa")]
        [RegularExpression("P|ON|LPG|EE", ErrorMessage = "Podany rodzaj paliwa jest niepoprawny")]
        public string RodzajPaliwa { get; set; }
    }
}
