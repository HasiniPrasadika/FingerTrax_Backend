const asyncHandler = require("express-async-handler");
const Department = require("../Models/DepModel");

const addDepartment = asyncHandler(async (req, res) => {
  const { depCode, depName, noOfStu, noOfLec } = req.body;

  const depExists = await Department.findOne({ depCode });

  if (depExists) {
    res.status(404);
    throw new Error("Department already exists");
  }

  const department = await Department.create({
    depCode,
    depName,
    noOfStu,
    noOfLec
  });

  if (department) {
    res.status(201).json({
      _id: department._id,
      depCode: department.depCode,
      depName: department.password,
      noOfStu: department.noOfStu,
      noOfLec: department.noOfLec
    });
  } else {
    console.error("Error adding department:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find();
  res.json(departments);
});

// Get one department

const getOneDepartment = asyncHandler(async (req, res) => {
  const {depCode} = req.body;

    const oneDepartment = await Module.findOne({depcode: depCode});
    res.json(oneDepartment);
});

const deleteDepartment = asyncHandler(async (req, res) => {
  
  const department = await Department.findById(req.body.id);
  

  if (department) {
    
    await department.deleteOne();
    res.json({ message: "Department removed" });
  } else {
    res.status(404);
    throw new Error("Department not found");
  }
});
const updateDepartment = asyncHandler(async (req, res) => {
  const { depCode, depName, noOfStu, noOfLec } = req.body;
  const departmentId = req.params.id;

  const department = await Department.findById(departmentId);

  if (department) {
    department.depCode = depCode;
    department.depName = depName;
    department.noOfStu = noOfStu;
    department.noOfLec = noOfLec;

    const updatedDepartment = await department.save();

    res.json({
      _id: updatedDepartment._id,
      depCode: updatedDepartment.depCode,
      depName: updatedDepartment.depName,
      noOfStu: updatedDepartment.noOfStu,
      noOfLec: updatedDepartment.noOfLec,
    });
  } else {
    res.status(404);
    throw new Error("Department not found");
  }
});



module.exports = {addDepartment, getDepartments,getOneDepartment, deleteDepartment, updateDepartment};




