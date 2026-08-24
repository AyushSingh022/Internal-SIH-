import { validationResult } from 'express-validator';
import * as analysisService from '../services/analysisService.js';
import { generateReportPDF } from '../pdf/generator.js';
import { successResponse, errorResponse } from '../utils/response.js';

export async function generateAnalysis(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsg = errors.array().map(e => e.msg).join(', ');
      return errorResponse(res, errorMsg || 'Validation failed', 400, errors.array());
    }

    const report = await analysisService.createAnalysis({
      userId: req.user.id,
      stateId: req.body.state_id,
      districtId: req.body.district_id,
      tehsilId: req.body.tehsil_id,
      blockId: req.body.block_id,
      villageId: req.body.village_id,
      categoryId: req.body.category_id,
      availableCapital: parseFloat(req.body.available_capital),
      searchRadiusKm: parseInt(req.body.search_radius_km) || 10,
      language: req.body.language || 'en',
    });

    return successResponse(res, report, 'Analysis generated successfully', 201);
  } catch (err) {
    console.error('Analysis generation error:', err);
    return errorResponse(res, err.message || 'Failed to generate analysis', err.status || 500);
  }
}

export async function getReports(req, res) {
  try {
    const reports = await analysisService.getUserReports(req.user.id);
    return successResponse(res, reports);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch reports', 500);
  }
}

export async function getReportById(req, res) {
  try {
    const report = await analysisService.getReportById(req.params.id, req.user.id);
    return successResponse(res, report);
  } catch (err) {
    return errorResponse(res, err.message || 'Failed to fetch report', err.status || 500);
  }
}

export async function downloadReportPDF(req, res) {
  try {
    const report = await analysisService.getReportById(req.params.id, req.user.id);
    const pdfBuffer = await generateReportPDF(report.toJSON());

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="business-report-${report.uuid}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    return res.send(pdfBuffer);
  } catch (err) {
    console.error('PDF generation error:', err);
    return errorResponse(res, err.message || 'Failed to generate PDF', err.status || 500);
  }
}
