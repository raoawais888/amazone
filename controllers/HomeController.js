
class HomeController {

     static index = async (req,res)=>{

    res.render('frontend/pages/home');

     }

     static about = async (req,res)=>{

    res.render('frontend/pages/about');

     }

     static product = async (req,res)=>{

        res.render('frontend/pages/product');
    
         }

     static why = async (req,res)=>{

        res.render('frontend/pages/why');
    
         }

     static  testimonial = async (req,res)=>{

        res.render('frontend/pages/testimonial');
    
         }


}

export default HomeController