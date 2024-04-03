import Admin from "../models/Admin/Admin.js";
import Hr from "../models/Hr/Hr.js";
import Indicator from "../models/Indicator/Indicator.js";
import Apprisal from "../models/Apprisial/Apprisal.js";
import Assets from "../models/Assets/Assets.js";
import Announcement from "../models/Announcement/Announcement.js";
import Tracking from "../models/Tracking/Tracking.js";
import Termination from "../models/Termination/Termination.js";
import Warning from "../models/Warning/Warning.js";
import Complain from "../models/Complain/Complain.js";
import Resignation from "../models/Resignation/Resignation.js";
import Promotion from "../models/Promotion/Promotion.js";
import User from "../models/User/User.js";
import Project from "../models/Project/Project.js";
import { createTransport } from "nodemailer";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { SendEmail } from "../utils/SendEmail.js";
import bcrypt from "bcryptjs";
import { removeUndefined } from "../utils/util.js";
import { mailSender } from "../utils/SendMail2.js";


export const getAdmins = asyncHandler(async (req, res) => {
  const admin = await Admin.find({}).select("-password ");
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        data: admin,
      },
      "Successfully feteched all admins"
    )
  );
});

export const getAdminProfile = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        message: `your profile is found: ${req.user.fullName}`,
        user: req.user,
      },
      "successfully fetched your profile"
    )
  );
});

export const ChangeCurrentAdminPassword = asyncHandler(async (req, res) => {
  const { oldpassword, newpassword, confirmpassword } = req.body;
  if (newpassword !== confirmpassword) {
    throw new ApiError(401, "New passwords do not match");
  }

  const admin = await Admin.findById(req.user._id);
  const passwordcheck = await admin.isPasswordCorrect(oldpassword);
  if (!passwordcheck) {
    throw new ApiError(401, "invalid User Old Password");
  }
  admin.password = newpassword;
  await admin.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Successfully Password Changed"));
});

const makeid = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
};

export const CreateNewHr = asyncHandler(async (req, res) => {
  try {
    const {
      fullName,
      password,
      department,
      gmail,
      reportingManager,
      designation,
      joiningDate,
      email,
      email1,
      mobile,
      gender,
      dob,
      pan,
      adhar,
      father,
      currentAddress,
      currentState,
      currentCity,
      currentPin,
      residence,
      perState,
      perCity,
      perPin,
      Martial,
      nationality,
      Mother,
      qualification,
      specialization,
      qualificationType,
      yearPass,
      university,
      college,
      percentage,
      previousCompany,
      previousDesignation,
      toDate,
      fromDate,
      numberOfMonth,
      Jobdescription,
      SalaryPay,
      SalaryBankName,
      BeneficiaryName,
      BankIfsc,
      AccountNumber,
      confirmAccount,
      Branch,
    } = req.body;

    const existedUser = await Hr.findOne({
      $or: [{ mobile }, { email }],
    });

    if (existedUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }
    const plainTextPassword = password;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    let employeeCode1 = makeid(7);
    console.log(employeeCode1);
    const message = `<div>
       <div>Employee ID: KDS${employeeCode1}</div>
       <div>Password: ${plainTextPassword}</div>
     </div>
     `;
    const html = `
       <div>
         <div>Employee ID: KDS${employeeCode1}</div>
         <div>Password: ${plainTextPassword}</div>
       </div>
     `;

    await SendEmail(email, "Login Details", message, html);

    const newHr = await Hr.create({
      fullName,
      role: "HR",
      department,
      gmail,
      password: hashedPassword,
      reportingManager,
      designation,
      joiningDate,
      email,
      email1,
      mobile,
      gender,
      dob,
      pan,
      employeeCode: employeeCode1,
      adhar,
      father,
      currentAddress,
      currentState,
      currentCity,
      currentPin,
      residence,
      perState,
      perCity,
      perPin,
      Martial,
      nationality,
      Mother,
      qualification,
      specialization,
      qualificationType,
      yearPass,
      university,
      college,
      percentage,
      previousCompany,
      previousDesignation,
      toDate,
      fromDate,
      numberOfMonth,
      Jobdescription,
      SalaryPay,
      SalaryBankName,
      BeneficiaryName,
      BankIfsc,
      AccountNumber,
      confirmAccount,
      Branch,
      createdBy: req.user.role,
    });
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          newHr,
        },
        "Admin account created successfully"
      )
    );
  } catch (error) {
    // console.log(employeeCode1);
    console.log("the error is :", error.message);
  }
});

export const CreateNewUser = asyncHandler(async (req, res) => {
  try {
    const {
      fullName,
      password,
      department,
      gmail,
      reportingManager,
      designation,
      joiningDate,
      email,
      email1,
      mobile,
      gender,
      dob,
      pan,
      adhar,
      father,
      currentAddress,
      currentState,
      currentCity,
      currentPin,
      residence,
      perState,
      perCity,
      perPin,
      Martial,
      nationality,
      Mother,
      qualification,
      specialization,
      qualificationType,
      yearPass,
      university,
      college,
      percentage,
      previousCompany,
      previousDesignation,
      toDate,
      fromDate,
      numberOfMonth,
      Jobdescription,
      SalaryPay,
      SalaryBankName,
      BeneficiaryName,
      BankIfsc,
      AccountNumber,
      confirmAccount,
      Branch,
    } = req.body;

    const employeeCode = makeid(7);
    const message = `<div>
    <div>Employee ID: KDS${employeeCode}</div>
    <div>Password: ${password}</div>
  </div>
  `;
    const html = `
    <div>
      <div>Employee ID: KDS${employeeCode}</div>
      <div>Password: ${password}</div>
    </div>
  `;
    await SendEmail(email, "Login Details", message, html);
    const adminUser = await User.create({
      department,
      password,
      fullName,

      gmail,
      reportingManager,
      designation,
      joiningDate,
      email,
      email1,
      mobile,
      gender,
      dob,
      employeeCode,
      pan,
      adhar,
      father,
      currentAddress,
      currentState,
      currentCity,
      currentPin,
      residence,
      perState,
      perCity,
      perPin,
      Martial,
      nationality,
      role:
        department === "Hr"
          ? "HR"
          : department === "Manager"
            ? "MANAGER"
            : "EMPLOYEE",
      Mother,
      qualification,
      specialization,
      qualificationType,
      yearPass,
      university,
      college,
      percentage,
      previousCompany,
      previousDesignation,
      toDate,
      fromDate,
      numberOfMonth,
      Jobdescription,
      SalaryPay,
      SalaryBankName,
      BeneficiaryName,
      BankIfsc,
      AccountNumber,
      confirmAccount,
      Branch,
      createdBy: req.user.role,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          adminUser,
        },
        "Admin account created successfully"
      )
    );
  } catch (error) {
    console.log("the error is :", error.message);
    throw new ApiError(500, "Internal Server Error");
  }
});

export const createAdmin = asyncHandler(async (req, res) => {
  const { fullName, dob, mobile, email, password } = req.body;
  if (
    [fullName, email, mobile, dob, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All Fields are required");
  }

  const profileImageLocalPath = req.file.path;
  if (!profileImageLocalPath) {
    throw new ApiError(400, "Profile local path is notfound");
  }
  const profileImage = await uploadToCloudinary(profileImageLocalPath);

  if (!profileImage) {
    throw new ApiError(400, "error uploading on cloudinary");
  }
  const existedUser = await User.findOne({
    $or: [{ fullName }, { email }],
  });
  if (existedUser) {
    return res.status(400).json({
      success: false,
      message: "Admin Already Exists",
    });
  }

  const adminUser = await Admin.create({
    fullName,
    dob,
    mobile,
    email,
    role: "ADMIN",
    profileImage: profileImage?.url,
    password,
  });
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        adminUser,
      },
      "Admin account created successfully"
    )
  );
});

export const updateAdmindetails = asyncHandler(async (req, res) => {
  try {
    const { fullName, dob, mobile, email, employeeCode } = req.body;
    const updateObj = removeUndefined({
      fullName,
      dob,
      mobile,
      email,
      employeeCode,
    });

    const admin = await Admin.findByIdAndUpdate(req.user._id, updateObj, {
      new: true,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, admin, "Updated User Details Successfully"));
  } catch (error) {
    console.log("error is ", error.message);
    throw new ApiError(error.status || 500, "internal server error");
  }
});

const generateRefreshToken = async (userId) => {
  try {
    const admin = await Admin.findById(userId);

    if (!admin) {
      throw new ApiError(404, "admin not found");
    }

    const token = admin.generateAuthToken();

    return token;
  } catch (error) {
    // Log the actual error for debugging purposes
    console.error("Error in generateRefreshToken:", error.message);

    throw new ApiError(500, "Something went wrong");
  }
};

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new ApiError(404, "Admin  not found");
    }
    const isPasswordValid = await admin.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }
    const token = await generateRefreshToken(admin._id);

    const loggedAdmin = await Admin.findById(admin._id).select("-password ");

    return res.json(
      new ApiResponse(
        200,
        {
          user: loggedAdmin,
          token,
        },
        "Admin is successfully logged in"
      )
    );
  } catch (error) {
    console.log("error is ", error.message);
  }
});

export const topDash = async ({ auth }) => {
  // todo
  const hrs = auth.usersCreated;
  const projects = await Project.find({ hr: { $in: hrs } });
  const employees = await Admin.find({ hr: { $in: hrs } });

  return {
    success: true,
    projectsLength: projects.length,
    projects,
    employees,
  };
};

export const postIndicator = asyncHandler(async (req, res) => {
  const { Branch, Department, Designation, businessProcessRating, projectManagemntRating } = req.body;

  // retreiving all the user of same department and designation 
  const users = await User.find({ department: Department, designation: Designation });

  //  Extract email addresses from the retrieved user 
  const emailList = users.map(user => user.email);

  for (const email of emailList) {
    await SendEmail(email);
    console.log(`Email sent to ${email}`);
  }


  const indicator = await Indicator.create({
    Branch,
    Department,
    Designation,
    businessProcessRating,
    projectManagemntRating,
    ts: new Date().getTime(),
    status: "true",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, indicator, " successfully posted"));
});

export const getIndicator = asyncHandler(async (req, res) => {
  const data = await Indicator.find();
  return res
    .status(200)
    .json(new ApiResponse(200, data, " Successfully fetched all the Indicator"));
});

export const deleteIndicator = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await Indicator.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Deleted   Successfully"));
});

export const updateIndicator = asyncHandler(async (req, res) => {
  const { Branch, Department, Designation, businessProcessRating, projectManagemntRating } = req.body;
  const { id } = req.params;
  let updateObj = removeUndefined({ Branch, Department, Designation, businessProcessRating, projectManagemntRating });


  // retreiving all the user of same department and designation 
  const users = await User.find({ department: Department, designation: Designation });

  //  Extract email addresses from the retrieved user 
  const emailList = users.map(user => user.email);


  for (const email of emailList) {
    await mailSender(email, `Regarding UpdateIndicator`, `<div>
      <div>Description: ${updateObj}</div>
      </div>` );
  }


  const updateIndicator = await Indicator.findByIdAndUpdate(
    id,
    {
      $set: updateObj,
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updateIndicator, "Updated  Successfully"));
});

export const postApprisal = asyncHandler(async (req, res) => {

  const { Branch, SelectMonth, Employee, remarks } = req.body;


  // retreiving all the user of same department and designation 
  const userDetail = await User.findOne({ fullName: Employee });

  await mailSender(userDetail.email, `Regarding Create Apprisal`, `<div>
    <div>Branch By: ${Branch}</div>
    <div>SelectMonth: ${SelectMonth}</div>
    <div>Employee: ${Employee}</div>
    <div>remarks: ${remarks}</div>
    </div>`);

  const apprisal = await Apprisal.create({
    Branch,
    SelectMonth,
    Employee,
    remarks
  });
  return res
    .status(200)
    .json(new ApiResponse(200, apprisal, " successfully posted"));
});

export const getApprisal = asyncHandler(async (req, res) => {

  const data = await Apprisal.find({}).sort({ Branch: "-1" }).lean();

  const newData = [];
  for (const item of data) {
    const user = await User.findOne({ fullName: item.Employee }).select('designation department');

    if (user) {
      // Add user's designation and department to the item
      item.designation = user.designation;
      item.department = user.department;
    }

    newData.push(item);
  }


  return res
    .status(200)
    .json(new ApiResponse(200, newData, " Successfully fetched all the Apprisal"));

});


export const fetchEmployee = asyncHandler(async (req, res) => {

  const { department } = req.body;

  const emp = await User.find({ department: department });

  return res.status(200).json({
    status: true,
    emp
  })


})

export const fetchAllEmployee = asyncHandler(async (req, res) => {
  const emp = await User.find({});

  return res.status(200).json({
    status: true,
    emp
  })
})

export const deleteApprisal = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await Apprisal.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Deleted   Successfully"));
});

export const updateApprisal = asyncHandler(async (req, res) => {
  const { Branch, SelectMonth, Employee, remarks } = req.body;
  const { id } = req.params;

  // retreiving all the user of same department and designation 
  const userDetail = await User.findOne({ fullName: Employee });

  await mailSender(userDetail.email, "Regarding Update Apprisal", `<div>
  <div>Branch: ${Branch}</div>
  <div>SelectMonth: ${SelectMonth}</div>
  <div>Employee: ${Employee}</div>
  <div>remarks: ${remarks}</div>
  </div>`);


  let updateObj = removeUndefined({ Branch, SelectMonth, Employee, remarks });

  const updateApprisal = await Apprisal.findByIdAndUpdate(
    id,
    {
      $set: updateObj,
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updateApprisal, "Updated  Successfully"));
});

// =====================assets controller start================

export const postAssets = asyncHandler(async (req, res) => {

  const { Employee,
    Name,
    amount,
    purchaseDate,
    supportedDate,
    description
  } = req.body;

  const users = await User.findOne({ fullName: Employee });

  await mailSender(users.email, "Regarding Create Assets", `<div>
  <div>Name: ${Name}</div>
  <div>amount: ${amount}</div>
  <div> purchaseDate: ${purchaseDate}</div>
  <div>supportedDate: ${supportedDate}</div>
  </div>`);

  console.log(`mail send to ${users}`);


  const apprisal = await Assets.create({
    Employee,
    Name,
    amount,
    purchaseDate,
    supportedDate,
    description
  });
  return res
    .status(200)
    .json(new ApiResponse(200, apprisal, " successfully posted"));
});

export const getAssets = asyncHandler(async (req, res) => {

  const data = await Assets.find({}).sort({ Branch: "-1" }).lean();

  const newData = [];
  for (const item of data) {
    const user = await User.findOne({ fullName: item.Employee }).select('designation department');

    if (user) {
      // Add user's designation and department to the item
      item.designation = user.designation;
      item.department = user.department;
      // item.email = user.email
    }

    newData.push(item);
  }


  return res
    .status(200)
    .json(new ApiResponse(200, newData, " Successfully fetched all the Assets"));

});

export const deleteAssets = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await Assets.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Deleted   Successfully"));
});

export const updateAssets = asyncHandler(async (req, res) => {
  const { Name,
    amount,
    purchaseDate,
    supportedDate,
    description
  } = req.body;

  const { id } = req.params;

  const users = await User.findOne({ _id: id });

  await mailSender(users.email, "Regarding Update Assets", `<div>
  <div>Name: ${Name}</div>
  <div>amount: ${amount}</div>
  <div> purchaseDate: ${purchaseDate}</div>
  <div>supportedDate: ${supportedDate}</div>
  </div>`
  );



  let updateObj = removeUndefined({
    Name,
    amount,
    purchaseDate,
    supportedDate,
    description
  });

  const updateApprisal = await Assets.findByIdAndUpdate(
    id,
    {
      $set: updateObj,
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updateApprisal, "Updated  Successfully"));
});


// =========================GOAL TRACKING API START================
export const postTracking = asyncHandler(async (req, res) => {

  const { Branch, GoalType, startDate, endDate, subject, target, description, status, rating, progress } = req.body;

  const tracking = await Tracking.create({ Branch, GoalType, startDate, endDate, subject, target, description, status, rating, progress });
  return res
    .status(200)
    .json(new ApiResponse(200, tracking, " successfully posted"));
});

export const getTracking = asyncHandler(async (req, res) => {
  const data = await Tracking.find();
  return res
    .status(200)
    .json(new ApiResponse(200, data, " Successfully fetched all the Tracking"));
});

export const deleteTracking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await Tracking.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Deleted   Successfully"));
});

export const updateTracking = asyncHandler(async (req, res) => {
  const { Branch, GoalType, startDate, endDate, subject, target, description, status, rating, progress } = req.body;
  const { id } = req.params;


  let updateObj = removeUndefined({ Branch, GoalType, startDate, endDate, subject, target, description, status, rating, progress });

  const updateTracking = await Tracking.findByIdAndUpdate(
    id,
    {
      $set: updateObj,
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updateTracking, "Updated  Successfully"));
});

// ========================announcement controller================
export const postAnnouncement = asyncHandler(async (req, res) => {
  const { title, Branch, Department, Employee, startDate, endDate, description } = req.body;

  // retreiving all the user of same department and designation 
  if (Employee === "All Employee") {

    const users = await User.find({ department: Department });

    for (const user of users) {
      await mailSender(user.email, "Create Annnouncement ", `<div>
      <div>title: ${title}</div>
      <div>Branch: ${Branch}</div>
      <div>Department: ${Department}</div>
      <div>Employee: ${Employee}</div>
      <div>startDate: ${startDate}</div>
      <div>endDate: ${endDate}</div>
      <div>description: ${description}</div>
      </div>`)


    }


  }
  else {

    const user = await User.findOne({ fullName: Employee });
    await mailSender(user.email, "Create Annnouncement ", `<div>
    <div>title: ${title}</div>
    <div>Branch: ${Branch}</div>
    <div>Department: ${Department}</div>
    <div>Employee: ${Employee}</div>
    <div>startDate: ${startDate}</div>
    <div>endDate: ${endDate}</div>
    <div>description: ${description}</div>
    </div>`)

  }


  const announcement = await Announcement.create({
    title,
    Branch,
    Department,
    Employee,
    startDate,
    endDate,
    description: description,
    ts: new Date().getTime(),
    status: "true",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, announcement, " successfully posted"));
});


export const getAnnouncement = asyncHandler(async (req, res) => {
  const data = await Announcement.find();
  return res
    .status(200)
    .json(new ApiResponse(200, data, " Successfully fetched all the Announcement"));
});


export const deleteAnnouncement = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await Announcement.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Deleted   Successfully"));
});

export const updateAnnouncement = asyncHandler(async (req, res) => {
  const { title, Branch, Department, Employee, startDate, endDate, description } = req.body;
  const { id } = req.params;
  let updateObj = removeUndefined({ title, Branch, Department, Employee, startDate, endDate, description });


  // retreiving all the user of same department and designation 
  if (Employee === "All Employee") {

    const users = await User.find({ department: Department });
    for (const user of users) {
      await mailSender(user.email, "update Annnouncement ", `<div>
      <div>title: ${title}</div>
      <div>Branch: ${Branch}</div>
      <div>Department: ${Department}</div>
      <div>Employee: ${Employee}</div>
      <div>startDate: ${startDate}</div>
      <div>endDate: ${endDate}</div>
      <div>description: ${description}</div>
      </div>`)

    }


  }
  else {

    const user = await User.findOne({ fullName: Employee });
    await mailSender(user.email, "update Annnouncement ", `<div>
    <div>title: ${title}</div>
    <div>Branch: ${Branch}</div>
    <div>Department: ${Department}</div>
    <div>Employee: ${Employee}</div>
    <div>startDate: ${startDate}</div>
    <div>endDate: ${endDate}</div>
    <div>description: ${description}</div>
    </div>`)
  }


  const updateAnnouncement = await Announcement.findByIdAndUpdate(
    id,
    {
      $set: updateObj,
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updateAnnouncement, "Updated  Successfully"));
});

// ==================== termination apis in backend==============

export const postTermination = asyncHandler(async (req, res) => {

  const { Employee,
    type,
    noticeDate,
    terminationDate,
    description
  } = req.body;

  const users = await User.findOne({ fullName: Employee });

  let transporter = createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "webmaster.kushel@gmail.com",
      pass: "paurymswxlpytekp",
    },
    tls: {
      rejectUnauthorized: false // Temporarily bypass certificate validation
    }
  });

  let info = await transporter.sendMail({
    from: 'Kushel Digi Solutions" <info@kusheldigi.com>',
    to: `${users.email}`,
    subject: "Regarding Termination",
    html: `<div>
      <div>Termination Type: ${type}</div>
      <div>NoticeDate: ${noticeDate}</div>
      <div>TerminationDate: ${terminationDate}</div>
      <div>Description: ${description}</div>
      </div>`
  });


  console.log(`mail send to ${users}`);


  const termination = await Termination.create({
    Employee,
    type,
    noticeDate,
    terminationDate,
    description
  });
  return res
    .status(200)
    .json(new ApiResponse(200, termination, " successfully posted"));
});

export const getTermination = asyncHandler(async (req, res) => {
  const data = await Termination.find();
  return res
    .status(200)
    .json(new ApiResponse(200, data, " Successfully fetched all the Termination"));
});

export const deleteTermination = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await Termination.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Deleted Successfully"));
});

export const updateTermination = asyncHandler(async (req, res) => {
  const { Employee,
    type,
    noticeDate,
    terminationDate,
    description } = req.body;

  const { id } = req.params;

  // const users = await User.findOne({ _id: id });
  const users = await User.findOne({ fullName: Employee });

  let updateObj = removeUndefined({
    Employee,
    type,
    noticeDate,
    terminationDate,
    description
  });

  let transporter = createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "webmaster.kushel@gmail.com",
      pass: "paurymswxlpytekp",
    },
    tls: {
      rejectUnauthorized: false // Temporarily bypass certificate validation
    }
  });

  let info = await transporter.sendMail({
    from: 'Kushel Digi Solutions" <info@kusheldigi.com>',
    to: `${users.email}`,
    subject: "Regarding Termination",
    html: `<div>
      <div>Termination Type: ${type}</div>
      <div>NoticeDate: ${noticeDate}</div>
      <div>TerminationDate: ${terminationDate}</div>
      <div>Description: ${description}</div>
      </div>`
  });

  console.log(`mail send to ${users}`);

  const updateTermination = await Termination.findByIdAndUpdate(
    id,
    {
      $set: updateObj,
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updateTermination, "Updated  Successfully"));
});

// ================== warning api=================

export const postWarning = asyncHandler(async (req, res) => {

  const { warningBy,
    warningTo,
    subject,
    warningDate,
    description
  } = req.body;

  // const users = await User.findOne({ fullName: warningBy });
  const users1 = await User.findOne({ fullName: warningTo });

  let transporter = createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "webmaster.kushel@gmail.com",
      pass: "paurymswxlpytekp",
    },
    tls: {
      rejectUnauthorized: false // Temporarily bypass certificate validation
    }
  });

  let info = await transporter.sendMail({
    from: 'Kushel Digi Solutions" <asitmandal492@gmail.com>',
    to: `${users1.email}`,
    subject: "Regarding Warning",
    html: `<div>
      <div>Warning By: ${warningBy}</div>
      <div>Subject: ${subject}</div>
      <div>Warning Date: ${warningDate}</div>
      <div>Description: ${description}</div>
      </div>`
  });


  console.log(`mail send to ${users1}`);


  const termination = await Warning.create({
    warningBy,
    warningTo,
    subject,
    warningDate,
    description
  });
  return res
    .status(200)
    .json(new ApiResponse(200, termination, " successfully posted"));
});

export const getWarning = asyncHandler(async (req, res) => {
  const data = await Warning.find();
  return res
    .status(200)
    .json(new ApiResponse(200, data, " Successfully fetched all the Warning"));
});

export const deleteWarning = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await Warning.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Deleted Successfully"));
});

export const updateWarning = asyncHandler(async (req, res) => {
  const { warningBy,
    warningTo,
    subject,
    warningDate,
    description } = req.body;

  const { id } = req.params;

  const users1 = await User.findOne({ fullName: warningTo });



  let updateObj = removeUndefined({
    warningBy,
    warningTo,
    subject,
    warningDate,
    description
  });

  let transporter = createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "webmaster.kushel@gmail.com",
      pass: "paurymswxlpytekp",
    },
    tls: {
      rejectUnauthorized: false // Temporarily bypass certificate validation
    }
  });

  let info = await transporter.sendMail({
    from: 'Kushel Digi Solutions" <info@kusheldigi.com>',
    to: `${users1.email}`,
    subject: "Regarding Warning",
    html: `<div>
      <div>Warning By: ${warningBy}</div>
      <div>Subject: ${subject}</div>
      <div>Warning Date: ${warningDate}</div>
      <div>Description: ${description}</div>
      </div>`
  });

  console.log(`mail send to ${users1}`);

  const updateTermination = await Warning.findByIdAndUpdate(
    id,
    {
      $set: updateObj,
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updateTermination, "Updated  Successfully"));
});

export const postComplain = asyncHandler(async (req, res) => {

  const { complainFrom,
    complainAgain,
    title,
    complainDate,
    description
  } = req.body;

  // const users = await User.findOne({ fullName: warningBy });
  const users1 = await User.findOne({ fullName: complainAgain });

  let transporter = createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "webmaster.kushel@gmail.com",
      pass: "paurymswxlpytekp",
    },
    tls: {
      rejectUnauthorized: false // Temporarily bypass certificate validation
    }
  });

  let info = await transporter.sendMail({
    from: 'Kushel Digi Solutions" <info@kusheldigi.com>',
    to: `${users1.email}`,
    subject: "Regarding Warning",
    html: `<div>
      <div>Complain From: ${complainFrom}</div>
      <div>Title: ${title}</div>
      <div>Complain Date: ${complainDate}</div>
      <div>Description: ${description}</div>
      </div>`
  });


  console.log(`mail send to ${users1}`);


  const complain = await Complain.create({
    complainFrom,
    complainAgain,
    title,
    complainDate,
    description
  });
  return res
    .status(200)
    .json(new ApiResponse(200, complain, " successfully posted"));
});

export const getComplain = asyncHandler(async (req, res) => {
  const data = await Complain.find();
  return res
    .status(200)
    .json(new ApiResponse(200, data, " Successfully fetched all the Warning"));
});

export const deleteComplain = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await Complain.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Deleted Successfully"));
});

export const updateComplain = asyncHandler(async (req, res) => {
  const { complainFrom,
    complainAgain,
    title,
    complainDate,
    description } = req.body;

  const { id } = req.params;

  const users1 = await User.findOne({ fullName: complainAgain });



  let updateObj = removeUndefined({
    complainFrom,
    complainAgain,
    title,
    complainDate,
    description
  });

  let transporter = createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "webmaster.kushel@gmail.com",
      pass: "paurymswxlpytekp",
    },
    tls: {
      rejectUnauthorized: false // Temporarily bypass certificate validation
    }
  });

  let info = await transporter.sendMail({
    from: 'Kushel Digi Solutions" <info@kusheldigi.com>',
    to: `${users1.email}`,
    subject: "Regarding Warning",
    html: `<div>
      <div>Complain From: ${complainFrom}</div>
      <div>Title: ${title}</div>
      <div>Complain Date: ${complainDate}</div>
      <div>Description: ${description}</div>
      </div>`
  });

  console.log(`mail send to ${users1}`);

  const updateTermination = await Complain.findByIdAndUpdate(
    id,
    {
      $set: updateObj,
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updateTermination, "Updated  Successfully"));
});

export const postResignation = asyncHandler(async (req, res) => {

  const {  Employee,
    noticeDate,
    resignationDate,
    description
  } = req.body;

  // const users = await User.findOne({ fullName: warningBy });
  const users1 = await User.findOne({ fullName: Employee });

  let transporter = createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "webmaster.kushel@gmail.com",
      pass: "paurymswxlpytekp",
    },
    tls: {
      rejectUnauthorized: false // Temporarily bypass certificate validation
    }
  });

  let info = await transporter.sendMail({
    from: 'Kushel Digi Solutions" <info@kusheldigi.com>',
    to: `${users1.email}`,
    subject: "Regarding Resignation",
    html: `<div>
      <div>Employee: ${Employee}</div>
      <div>Notice Date: ${noticeDate}</div>
      <div>Resignation Date: ${resignationDate}</div>
      <div>Description: ${description}</div>
      </div>`
  });


  console.log(`mail send to ${users1}`);


  const resignation = await Resignation.create({
    Employee,
    noticeDate,
    resignationDate,
    description
  });
  return res
    .status(200)
    .json(new ApiResponse(200, resignation, " successfully posted"));
});

export const getResignation = asyncHandler(async (req, res) => {
  const data = await Resignation.find();
  return res
    .status(200)
    .json(new ApiResponse(200, data, " Successfully fetched all the Resignation"));
});

export const deleteResignation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await Resignation.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Deleted Successfully"));
});

export const updateResignation = asyncHandler(async (req, res) => {
  const {Employee,
    noticeDate,
    resignationDate,
    description} = req.body;

  const { id } = req.params;

  const users1 = await User.findOne({ fullName:Employee });

  let updateObj = removeUndefined({
    Employee,
    noticeDate,
    resignationDate,
    description
  });

  let transporter = createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "webmaster.kushel@gmail.com",
      pass: "paurymswxlpytekp",
    },
    tls: {
      rejectUnauthorized: false // Temporarily bypass certificate validation
    }
  });

  let info = await transporter.sendMail({
    from: 'Kushel Digi Solutions" <info@kusheldigi.com>',
    to: `${users1.email}`,
    subject: "Regarding Resignation",
    html: `<div>
      <div>Employee: ${Employee}</div>
      <div>Notice Date: ${noticeDate}</div>
      <div>Resignation Date: ${resignationDate}</div>
      <div>Description: ${description}</div>
      </div>`
  });

  console.log(`mail send to ${users1}`);

  const updateResignation = await Resignation.findByIdAndUpdate(
    id,
    {
      $set: updateObj,
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updateResignation, "Updated  Successfully"));
});

// ========================promotion apis===========

export const postPromotion = asyncHandler(async (req, res) => {

  const {Employee,Designation,title,promotionDate, description} = req.body;

  // const users = await User.findOne({ fullName: warningBy });
  const users1 = await User.findOne({ fullName: Employee });

  // const user2 = await User.updateOne({''})

  let transporter = createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "webmaster.kushel@gmail.com",
      pass: "paurymswxlpytekp",
    },
    tls: {
      rejectUnauthorized: false // Temporarily bypass certificate validation
    }
  });

  let info = await transporter.sendMail({
    from: 'Kushel Digi Solutions" <info@kusheldigi.com>',
    to: `${users1.email}`,
    subject: "Regarding Resignation",
    html: `<div>
      <div>Employee: ${Employee}</div>
      <div>Designation: ${Designation}</div>
      <div>title: ${title}</div>
      <div>Promotion Date: ${promotionDate}</div>
      <div>Description: ${description}</div>
      </div>`
  });


  console.log(`mail send to ${users1}`);


  const promotion = await Promotion.create({
    Employee,Designation,title,promotionDate, description
  });
  return res
    .status(200)
    .json(new ApiResponse(200,  promotion, " successfully posted"));
});

export const getPromotion = asyncHandler(async (req, res) => {
  const data = await Promotion.find();
  return res
    .status(200)
    .json(new ApiResponse(200, data, " Successfully fetched all the Promotion"));
});

export const deletePromotion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await Promotion.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Deleted Successfully"));
});

export const updatePromotion = asyncHandler(async (req, res) => {
  const {Employee,Designation,title,promotionDate, description} = req.body;

  const { id } = req.params;

  const users1 = await User.findOne({ fullName:Employee });

  let updateObj = removeUndefined({
    Employee,Designation,title,promotionDate, description
  });

  let transporter = createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "webmaster.kushel@gmail.com",
      pass: "paurymswxlpytekp",
    },
    tls: {
      rejectUnauthorized: false // Temporarily bypass certificate validation
    }
  });

  let info = await transporter.sendMail({
    from: 'Kushel Digi Solutions" <info@kusheldigi.com>',
    to: `${users1.email}`,
    subject: "Regarding Resignation",
    html: `<div>
      <div>Employee: ${Employee}</div>
      <div>Notice Date: ${noticeDate}</div>
      <div>Resignation Date: ${resignationDate}</div>
      <div>Description: ${description}</div>
      </div>`
  });

  console.log(`mail send to ${users1}`);

  const updatePromotion = await Promotion.findByIdAndUpdate(
    id,
    {
      $set: updateObj,
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updatePromotion, "Updated  Successfully"));
});



