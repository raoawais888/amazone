class adminController {
    static dashboard = async (req,res) => {
       await res.render("backend/pages/dashboard");
    }
     
}

export default adminController