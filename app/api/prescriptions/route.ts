import { NextRequest, NextResponse } from 'next/server'
import { getPrescriptionQueries } from '@/lib/database'
import { generateId } from '@/lib/auth-utils'

export async function POST(request: NextRequest) {
  try {
    const {
      patientId,
      doctorId,
      emergencyRequestId,
      medicationName,
      dosage,
      frequency,
      duration,
      instructions
    } = await request.json()

    if (!patientId || !doctorId || !medicationName || !dosage || !frequency || !duration) {
      return NextResponse.json(
        { message: 'Patient ID, doctor ID, medication name, dosage, frequency, and duration are required' },
        { status: 400 }
      )
    }

    // Generate prescription ID
    const prescriptionId = generateId('rx_')

    // Create prescription
    const prescriptionQueries = getPrescriptionQueries()
    prescriptionQueries.create.run(
      prescriptionId,
      patientId,
      doctorId,
      emergencyRequestId || null,
      medicationName,
      dosage,
      frequency,
      duration,
      instructions || null
    )

    // Return the created prescription with doctor info
    const prescriptions = prescriptionQueries.findByPatient.all(patientId)
    const newPrescription = prescriptions.find(p => p.id === prescriptionId)

    return NextResponse.json(newPrescription, { status: 201 })

  } catch (error) {
    console.error('Prescription creation error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const patientId = searchParams.get('patientId')

    if (!patientId) {
      return NextResponse.json(
        { message: 'Patient ID is required' },
        { status: 400 }
      )
    }

    // Get all prescriptions for patient
    const prescriptionQueries = getPrescriptionQueries()
    const prescriptions = prescriptionQueries.findByPatient.all(patientId)
    return NextResponse.json(prescriptions)

  } catch (error) {
    console.error('Prescriptions fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}