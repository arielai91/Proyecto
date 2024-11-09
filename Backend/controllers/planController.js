const Plan = require("../model/planSchema");

class PlanController {
  // Crear un nuevo plan
  async createPlan(req, res) {
    try {
      const newPlan = new Plan(req.body);
      const savedPlan = await newPlan.save();
      res.status(201).json(savedPlan);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Obtener todos los planes
  async getAllPlans(req, res) {
    try {
      const plans = await Plan.find();
      res.status(200).json(plans);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Obtener un plan por ID o nombre
  async getPlan(req, res) {
    try {
      const { id, nombre } = req.params;
      let plan;
      if (id) {
        plan = await Plan.findById(id);
      } else if (nombre) {
        plan = await Plan.findOne({ nombre });
      }
      if (!plan) {
        return res.status(404).json({ message: "Plan no encontrado" });
      }
      res.status(200).json(plan);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Actualizar un plan por ID o nombre
  async updatePlan(req, res) {
    try {
      const { id, nombre } = req.params;
      let updatedPlan;
      if (id) {
        updatedPlan = await Plan.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
      } else if (nombre) {
        updatedPlan = await Plan.findOneAndUpdate({ nombre }, req.body, {
          new: true,
          runValidators: true,
        });
      }
      if (!updatedPlan) {
        return res.status(404).json({ message: "Plan no encontrado" });
      }
      res.status(200).json(updatedPlan);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Eliminar un plan por ID o nombre
  async deletePlan(req, res) {
    try {
      const { id, nombre } = req.params;
      let deletedPlan;
      if (id) {
        deletedPlan = await Plan.findByIdAndDelete(id);
      } else if (nombre) {
        deletedPlan = await Plan.findOneAndDelete({ nombre });
      }
      if (!deletedPlan) {
        return res.status(404).json({ message: "Plan no encontrado" });
      }
      res.status(200).json({ message: "Plan eliminado exitosamente" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = PlanController;
